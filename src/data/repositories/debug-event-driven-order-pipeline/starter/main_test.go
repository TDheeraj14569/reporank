package main

import (
	"fmt"
	"runtime"
	"sync"
	"testing"
	"time"
)

func TestProcessOrders_Success(t *testing.T) {
	catalog := NewCatalog(map[string]int{"itemA": 10, "itemB": 5})
	pipeline := NewOrderPipeline(catalog)

	orders := []*Order{
		{ID: "1", Status: "Pending", Items: []string{"itemA", "itemB"}},
		{ID: "2", Status: "Pending", Items: []string{"itemA"}},
	}

	err := pipeline.ProcessOrders(orders)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	catalog.mu.RLock()
	defer catalog.mu.RUnlock()
	if catalog.items["itemA"] != 8 {
		t.Errorf("expected 8 itemA, got %d", catalog.items["itemA"])
	}
	if catalog.items["itemB"] != 4 {
		t.Errorf("expected 4 itemB, got %d", catalog.items["itemB"])
	}

	for _, o := range orders {
		if o.Status != "Shipped" {
			t.Errorf("expected order %s to be Shipped, got %s", o.ID, o.Status)
		}
	}
}

func TestProcessOrders_GoroutineLeakAndRollback(t *testing.T) {
	initialGoroutines := runtime.NumGoroutine()
	
	catalog := NewCatalog(map[string]int{"itemA": 10})
	pipeline := NewOrderPipeline(catalog)

	orders := []*Order{
		{ID: "1", Status: "Pending", Items: []string{"itemA"}},
		{ID: "2", Status: "Shipped", Items: []string{"itemA"}}, // invalid state
		{ID: "3", Status: "Pending", Items: []string{"itemX"}}, // out of stock
		{ID: "4", Status: "Pending", Items: []string{"itemA"}},
	}

	err := pipeline.ProcessOrders(orders)
	if err == nil {
		t.Fatal("expected error, got nil")
	}

	time.Sleep(200 * time.Millisecond)

	finalGoroutines := runtime.NumGoroutine()
	
	if finalGoroutines > initialGoroutines+1 { 
		t.Errorf("Goroutine leak detected: started with %d, ended with %d", initialGoroutines, finalGoroutines)
	}

	catalog.mu.RLock()
	defer catalog.mu.RUnlock()
	if catalog.items["itemA"] != 10 {
		t.Errorf("expected itemA to be rolled back to 10, got %d", catalog.items["itemA"])
	}
	
	for _, o := range orders {
		if o.ID == "1" || o.ID == "4" {
			if o.Status != "Pending" {
				t.Errorf("expected valid order %s to be rolled back to Pending, got %s", o.ID, o.Status)
			}
		}
	}
}

func TestProcessOrders_ConcurrentSafety(t *testing.T) {
	catalog := NewCatalog(map[string]int{"itemA": 1000})
	pipeline := NewOrderPipeline(catalog)

	var orders []*Order
	for i := 0; i < 500; i++ {
		orders = append(orders, &Order{ID: fmt.Sprintf("%d", i), Status: "Pending", Items: []string{"itemA"}})
	}

	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(start int) {
			defer wg.Done()
			batch := orders[start : start+50]
			_ = pipeline.ProcessOrders(batch)
		}(i * 50)
	}
	wg.Wait()

	catalog.mu.RLock()
	defer catalog.mu.RUnlock()
	if catalog.items["itemA"] != 500 {
		t.Errorf("expected 500 itemA, got %d", catalog.items["itemA"])
	}
}
