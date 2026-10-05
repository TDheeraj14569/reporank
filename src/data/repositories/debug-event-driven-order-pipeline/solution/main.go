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
	// Fix 1: Buffer the error channel to prevent blocking when multiple errors occur
	errCh := make(chan error, len(orders))
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

	// Fix 2: Wait for all goroutines to finish before closing the error channel
	// This ensures that all processing is done, preventing data inconsistencies
	// during rollback.
	wg.Wait()
	close(errCh)

	var firstErr error
	for err := range errCh {
		if firstErr == nil {
			firstErr = err
		}
	}

	// Fix 3: Perform rollback only after all workers have completed
	if firstErr != nil {
		for _, order := range processed {
			p.catalog.Rollback(order.Items)
			order.Status = "Pending"
		}
		return firstErr
	}

	return nil
}

func main() {
	fmt.Println("Order Pipeline started.")
}
