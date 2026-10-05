package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetUserHandler_Success(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user?id=1", nil)
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
	err = json.NewDecoder(rr.Body).Decode(&user)
	if err != nil {
		t.Fatal(err)
	}

	if user.Name != "Alice" {
		t.Errorf("handler returned unexpected body: got %v want %v", user.Name, "Alice")
	}
}

func TestGetUserHandler_MissingID(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetUserHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code for missing ID: got %v want %v", status, http.StatusBadRequest)
	}

	var errResp ErrorResponse
	err = json.NewDecoder(rr.Body).Decode(&errResp)
	if err != nil {
		t.Fatal(err)
	}

	if errResp.Error != "bad_request" {
		t.Errorf("handler returned unexpected error code: got %v want %v", errResp.Error, "bad_request")
	}
}

func TestGetUserHandler_NotFound(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/user?id=999", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetUserHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusNotFound {
		t.Errorf("handler returned wrong status code for missing user: got %v want %v", status, http.StatusNotFound)
	}

	var errResp ErrorResponse
	err = json.NewDecoder(rr.Body).Decode(&errResp)
	if err != nil {
		t.Fatal(err)
	}

	if errResp.Error != "not_found" {
		t.Errorf("handler returned unexpected error code: got %v want %v", errResp.Error, "not_found")
	}
}
