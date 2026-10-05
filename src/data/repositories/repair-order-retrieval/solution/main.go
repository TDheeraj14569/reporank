package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
)

type State string

const (
	StatePending   State = "Pending"
	StateShipped   State = "Shipped"
	StateDelivered State = "Delivered"
	StateCancelled State = "Cancelled"
)

type Order struct {
	ID        string `json:"id"`
	ProductID string `json:"product_id"`
	Quantity  int    `json:"quantity"`
	State     State  `json:"state"`
}

type StateUpdate struct {
	State State `json:"state"`
}

type OrderService struct {
	mu      sync.Mutex
	orders  map[string]*Order
	catalog map[string]int
}

func NewOrderService() *OrderService {
	return &OrderService{
		orders: make(map[string]*Order),
		catalog: map[string]int{
			"PROD-A": 100,
			"PROD-B": 50,
		},
	}
}

func (s *OrderService) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost && r.URL.Path == "/orders" {
		s.handleCreateOrder(w, r)
		return
	}
	if r.Method == http.MethodPatch && len(r.URL.Path) > 8 && r.URL.Path[:8] == "/orders/" {
		id := r.URL.Path[8:]
		s.handleUpdateOrder(w, r, id)
		return
	}
	http.NotFound(w, r)
}

func (s *OrderService) handleCreateOrder(w http.ResponseWriter, r *http.Request) {
	var req Order
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	if req.ID == "" || req.ProductID == "" || req.Quantity <= 0 {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	avail, ok := s.catalog[req.ProductID]
	if !ok || avail < req.Quantity {
		http.Error(w, "Item not available", http.StatusBadRequest)
		return
	}

	req.State = StatePending
	s.orders[req.ID] = &req
	s.catalog[req.ProductID] -= req.Quantity

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(req)
}

func (s *OrderService) handleUpdateOrder(w http.ResponseWriter, r *http.Request, id string) {
	var update StateUpdate
	if err := json.NewDecoder(r.Body).Decode(&update); err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	order, ok := s.orders[id]
	if !ok {
		http.Error(w, "Not Found", http.StatusNotFound)
		return
	}

	if err := validateTransition(order.State, update.State); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	order.State = update.State
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(order)
}

func validateTransition(current, next State) error {
	switch current {
	case StatePending:
		if next != StateShipped && next != StateCancelled {
			return fmt.Errorf("invalid transition from %s to %s", current, next)
		}
	case StateShipped:
		if next != StateDelivered {
			return fmt.Errorf("invalid transition from %s to %s", current, next)
		}
	case StateDelivered, StateCancelled:
		return fmt.Errorf("order is in terminal state")
	}
	return fmt.Errorf("invalid transition to %s", next)
}

func main() {
	service := NewOrderService()
	http.ListenAndServe(":8080", service)
}
