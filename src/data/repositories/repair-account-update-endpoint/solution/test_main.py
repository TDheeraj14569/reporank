from fastapi.testclient import TestClient
from main import app, fake_users_db, verify_password

client = TestClient(app)

def setup_function():
    fake_users_db.clear()

def test_register_user():
    response = client.post("/register", json={
        "username": "johndoe",
        "email": "johndoe@example.com",
        "password": "securepassword123"
    })
    assert response.status_code == 200
    assert response.json() == {"username": "johndoe", "email": "johndoe@example.com"}
    
    stored_user = fake_users_db["johndoe"]
    assert stored_user["hashed_password"] != "securepassword123"
    assert verify_password("securepassword123", stored_user["hashed_password"])

def test_update_user_email():
    client.post("/register", json={
        "username": "janedoe",
        "email": "jane@example.com",
        "password": "mypassword"
    })
    
    response = client.put("/users/janedoe", json={
        "email": "jane.new@example.com"
    })
    assert response.status_code == 200
    assert response.json()["email"] == "jane.new@example.com"

def test_update_user_password_is_hashed():
    client.post("/register", json={
        "username": "alice",
        "email": "alice@example.com",
        "password": "initialpassword"
    })
    
    response = client.put("/users/alice", json={
        "password": "newsecurepassword"
    })
    assert response.status_code == 200
    
    stored_user = fake_users_db["alice"]
    assert stored_user["hashed_password"] != "newsecurepassword"
    assert verify_password("newsecurepassword", stored_user["hashed_password"])
