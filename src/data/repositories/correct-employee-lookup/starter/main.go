package main

import (
	"fmt"
	"log"

	"github.com/reporank/correct-employee-lookup/employee"
)

func main() {
	db := []employee.Employee{
		{ID: "E001", Name: "Alice Smith", Department: "Engineering", IsActive: true},
		{ID: "E002", Name: "Bob Jones", Department: "Sales", IsActive: true},
		{ID: "E003", Name: "Charlie Brown", Department: "Engineering", IsActive: false},
		{ID: "E004", Name: "Diana Prince", Department: "Marketing", IsActive: true},
		{ID: "E005", Name: "Evan Davis", Department: "Engineering", IsActive: true},
	}

	// Will work fine
	res, err := employee.SearchEmployees(db, "Engineering", 1, 2)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	fmt.Printf("Page 1: %+v\n", res)

	// Will panic due to out of bounds
	// res, err = employee.SearchEmployees(db, "Engineering", 3, 2)
	// fmt.Printf("Page 3: %+v\n", res)
}
