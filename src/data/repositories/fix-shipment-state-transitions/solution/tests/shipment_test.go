package tests

import (
	"testing"
	"../services"
)

func TestCannotMoveBackwards(t *testing.T) {
	s := &services.Shipment{Status: 3}
	err := services.UpdateStatus(s, 2)
	if err == nil {
		t.Error("Expected error when moving status backwards")
	}
}
