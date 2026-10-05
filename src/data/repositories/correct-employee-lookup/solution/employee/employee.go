package employee

import (
	"errors"
	"strings"
)

type Employee struct {
	ID         string
	Name       string
	Department string
	IsActive   bool
}

// SearchEmployees filters active and inactive employees by name or department and returns a paginated result.
func SearchEmployees(employees []Employee, query string, page, pageSize int) ([]Employee, error) {
	if page < 1 {
		return nil, errors.New("page must be 1 or greater")
	}
	if pageSize < 1 {
		return nil, errors.New("page size must be 1 or greater")
	}

	var filtered []Employee
	lowerQuery := strings.ToLower(query)

	for _, emp := range employees {
		if strings.Contains(strings.ToLower(emp.Name), lowerQuery) || strings.Contains(strings.ToLower(emp.Department), lowerQuery) {
			filtered = append(filtered, emp)
		}
	}

	start := (page - 1) * pageSize
	if start >= len(filtered) {
		return []Employee{}, nil
	}

	end := start + pageSize
	if end > len(filtered) {
		end = len(filtered)
	}

	return filtered[start:end], nil
}
