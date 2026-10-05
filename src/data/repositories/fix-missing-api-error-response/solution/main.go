package main

import (
	"encoding/json"
	"net/http"
)

type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}

type User struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

var users = map[string]User{
	"1": {ID: "1", Name: "Alice", Email: "alice@example.com"},
	"2": {ID: "2", Name: "Bob", Email: "bob@example.com"},
}

func GetUserHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := r.URL.Query().Get("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ErrorResponse{
			Error:   "bad_request",
			Message: "Missing user id parameter",
		})
		return
	}

	user, exists := users[id]
	if !exists {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(ErrorResponse{
			Error:   "not_found",
			Message: "User not found",
		})
		return
	}

	json.NewEncoder(w).Encode(user)
}

func main() {
	http.HandleFunc("/api/user", GetUserHandler)
	http.ListenAndServe(":8080", nil)
}
