package main

import (
	"encoding/json"
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

	// BUG: Missing validation for malformed payload like ID, ProductID, and Quantity

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

	// BUG: Missing mutex lock which causes race conditions

	order, ok := s.orders[id]
	if !ok {
		http.Error(w, "Not Found", http.StatusNotFound)
		return
	}

	// BUG: Incomplete state validation allows transitioning from Shipped back to Pending
	if order.State == StateDelivered {
		http.Error(w, "order already delivered", http.StatusBadRequest)
		return
	}

	order.State = update.State
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(order)
}

func main() {
	service := NewOrderService()
	http.ListenAndServe(":8080", service)
}
