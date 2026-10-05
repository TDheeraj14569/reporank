package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"
)

func TestOrderService(t *testing.T) {
	service := NewOrderService()

	t.Run("Create Order - Valid", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/orders", bytes.NewBufferString(`{"id":"o1","product_id":"PROD-A","quantity":1}`))
		w := httptest.NewRecorder()
		service.ServeHTTP(w, req)
		if w.Code != http.StatusCreated {
			t.Errorf("expected 201, got %d", w.Code)
		}
	})

	t.Run("Create Order - Missing Fields", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/orders", bytes.NewBufferString(`{"product_id":"PROD-A","quantity":1}`))
		w := httptest.NewRecorder()
		service.ServeHTTP(w, req)
		if w.Code != http.StatusBadRequest {
			t.Errorf("expected 400, got %d", w.Code)
		}
	})

	t.Run("Create Order - Insufficient Stock", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/orders", bytes.NewBufferString(`{"id":"o2","product_id":"PROD-A","quantity":1000}`))
		w := httptest.NewRecorder()
		service.ServeHTTP(w, req)
		if w.Code != http.StatusBadRequest {
			t.Errorf("expected 400, got %d", w.Code)
		}
	})

	t.Run("Update Order - Pending to Shipped", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPatch, "/orders/o1", bytes.NewBufferString(`{"state":"Shipped"}`))
		w := httptest.NewRecorder()
		service.ServeHTTP(w, req)
		if w.Code != http.StatusOK {
			t.Errorf("expected 200, got %d", w.Code)
		}
	})

	t.Run("Update Order - Invalid State Transition (Shipped to Pending)", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPatch, "/orders/o1", bytes.NewBufferString(`{"state":"Pending"}`))
		w := httptest.NewRecorder()
		service.ServeHTTP(w, req)
		if w.Code != http.StatusBadRequest {
			t.Errorf("expected 400, got %d", w.Code)
		}
	})

	t.Run("Update Order - Unknown State", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPatch, "/orders/o1", bytes.NewBufferString(`{"state":"Unknown"}`))
		w := httptest.NewRecorder()
		service.ServeHTTP(w, req)
		if w.Code != http.StatusBadRequest {
			t.Errorf("expected 400, got %d", w.Code)
		}
	})

	t.Run("Concurrent Updates", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/orders", bytes.NewBufferString(`{"id":"o_conc","product_id":"PROD-B","quantity":1}`))
		w := httptest.NewRecorder()
		service.ServeHTTP(w, req)

		var wg sync.WaitGroup
		for i := 0; i < 50; i++ {
			wg.Add(1)
			go func() {
				defer wg.Done()
				patchReq := httptest.NewRequest(http.MethodPatch, "/orders/o_conc", bytes.NewBufferString(`{"state":"Shipped"}`))
				patchW := httptest.NewRecorder()
				service.ServeHTTP(patchW, patchReq)
			}()
		}
		wg.Wait()
	})
}
