package main

import (
	"fmt"
	"sync"
)

type Order struct {
	ID     string
	Status string
	Items  []string
}

type Catalog struct {
	mu    sync.RWMutex
	items map[string]int
}

func NewCatalog(initial map[string]int) *Catalog {
	return &Catalog{
		items: initial,
	}
}

func (c *Catalog) CheckAndReserve(items []string) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	for _, item := range items {
		if qty, ok := c.items[item]; !ok || qty <= 0 {
			return fmt.Errorf("item unavailable: %s", item)
		}
	}

	for _, item := range items {
		c.items[item]--
	}
	return nil
}

func (c *Catalog) Rollback(items []string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	for _, item := range items {
		c.items[item]++
	}
}

type OrderPipeline struct {
	catalog *Catalog
}

func NewOrderPipeline(catalog *Catalog) *OrderPipeline {
	return &OrderPipeline{catalog: catalog}
}

func (p *OrderPipeline) ProcessOrders(orders []*Order) error {
	errCh := make(chan error) // Unbuffered error channel
	var wg sync.WaitGroup
	var mu sync.Mutex
	var processed []*Order

	for _, o := range orders {
		wg.Add(1)
		go func(order *Order) {
			defer wg.Done()

			if order.Status != "Pending" {
				errCh <- fmt.Errorf("invalid state transition for order %s", order.ID)
				return
			}
			if len(order.Items) == 0 {
				errCh <- fmt.Errorf("malformed payload: order %s has no items", order.ID)
				return
			}

			err := p.catalog.CheckAndReserve(order.Items)
			if err != nil {
				errCh <- err
				return
			}

			mu.Lock()
			order.Status = "Shipped"
			processed = append(processed, order)
			mu.Unlock()

		}(o)
	}

	go func() {
		wg.Wait()
		close(errCh)
	}()

	for err := range errCh {
		if err != nil {
			// Bug 1: Returning early on the first error stops reading from errCh.
			// Any subsequent goroutines trying to send an error will block forever on errCh <- err,
			// causing a goroutine leak and deadlock for those workers.
			
			// Bug 2: Rolling back currently processed orders, but leaving successfully 
			// processed orders from other goroutines that complete *after* we return unrolled,
			// causing data inconsistencies.
			
			mu.Lock()
			for _, order := range processed {
				p.catalog.Rollback(order.Items)
				order.Status = "Pending"
			}
			mu.Unlock()
			return err
		}
	}

	return nil
}

func main() {
	fmt.Println("Order Pipeline started.")
}
