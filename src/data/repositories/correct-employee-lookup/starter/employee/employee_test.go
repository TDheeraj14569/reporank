package employee

import (
	"testing"
)

func TestSearchEmployees_Success(t *testing.T) {
	db := []Employee{
		{ID: "E001", Name: "Alice Smith", Department: "Engineering", IsActive: true},
		{ID: "E002", Name: "Bob Jones", Department: "Sales", IsActive: true},
		{ID: "E003", Name: "Charlie Brown", Department: "Engineering", IsActive: false},
	}

	res, err := SearchEmployees(db, "Engineering", 1, 2)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if len(res) != 2 {
		t.Errorf("Expected 2 results, got %d", len(res))
	}
}

func TestSearchEmployees_OutOfBounds(t *testing.T) {
	db := []Employee{
		{ID: "E001", Name: "Alice Smith", Department: "Engineering", IsActive: true},
	}

	res, err := SearchEmployees(db, "Engineering", 2, 5)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if len(res) != 0 {
		t.Errorf("Expected 0 results for out of bounds page, got %d", len(res))
	}
}

func TestSearchEmployees_PartialPage(t *testing.T) {
	db := []Employee{
		{ID: "E001", Name: "Alice", Department: "HR", IsActive: true},
		{ID: "E002", Name: "Bob", Department: "HR", IsActive: true},
		{ID: "E003", Name: "Charlie", Department: "HR", IsActive: true},
	}

	res, err := SearchEmployees(db, "HR", 2, 2)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if len(res) != 1 {
		t.Errorf("Expected 1 result for partial page, got %d", len(res))
	}
	if res[0].Name != "Charlie" {
		t.Errorf("Expected Charlie, got %s", res[0].Name)
	}
}
