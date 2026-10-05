package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetUserHandler_ExistingUser(t *testing.T) {
	req, err := http.NewRequest("GET", "/user?id=1", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetUserHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	var user User
	err = json.Unmarshal(rr.Body.Bytes(), &user)
	if err != nil {
		t.Fatal(err)
	}

	if user.Name != "Alice" {
		t.Errorf("expected Alice, got %v", user.Name)
	}
}

func TestGetUserHandler_NonExistingUser(t *testing.T) {
	req, err := http.NewRequest("GET", "/user?id=999", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetUserHandler)

	handler.ServeHTTP(rr, req)

	// This test will fail on starter and pass on solution
	if status := rr.Code; status != http.StatusNotFound {
		t.Errorf("handler returned wrong status code for non-existing user: got %v want %v", status, http.StatusNotFound)
	}
}
