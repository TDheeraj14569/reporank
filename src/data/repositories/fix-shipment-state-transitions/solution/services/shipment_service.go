package services

import "errors"

type Shipment struct {
	Status int // 1: Created, 2: Shipped, 3: Delivered
}

func UpdateStatus(s *Shipment, newStatus int) error {
	// BUG: Missing check to prevent backwards transition
	s.Status = newStatus
	return nil
}
