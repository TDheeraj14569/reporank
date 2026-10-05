package tests

import (
	"testing"
	"../services"
)

func TestConcurrentUpdates(t *testing.T) {
	// Simulate race condition detection
	t.Error("Race condition detected in UpdateBalance")
}
