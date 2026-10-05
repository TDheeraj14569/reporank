import pytest
from fastapi.testclient import TestClient
from main import app, users_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def clear_db():
    users_db.clear()
    yield

def test_register_success():
    response = client.post("/register", json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "strongpassword123"
    })
    assert response.status_code == 201
    assert response.json() == {"message": "User registered successfully"}
    
    # Verify password is hashed, not stored as plaintext
    user = users_db["testuser"]
    assert user.hashed_password != "strongpassword123"
    assert "strongpassword123" not in user.hashed_password

def test_register_invalid_email():
    response = client.post("/register", json={
        "username": "testuser",
        "email": "not-an-email",
        "password": "strongpassword123"
    })
    assert response.status_code == 422 # FastAPI/Pydantic validation error

def test_register_short_password():
    response = client.post("/register", json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "short"
    })
    assert response.status_code == 422 # Pydantic min_length error

def test_duplicate_email_registration():
    client.post("/register", json={
        "username": "user1",
        "email": "shared@example.com",
        "password": "strongpassword123"
    })
    
    response = client.post("/register", json={
        "username": "user2",
        "email": "shared@example.com",
        "password": "strongpassword456"
    })
    assert response.status_code == 400
    assert "Email already registered" in response.json()["detail"]

def test_login_and_update_profile():
    client.post("/register", json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "strongpassword123"
    })
    
    # Login
    response = client.post("/login", data={
        "username": "testuser",
        "password": "strongpassword123"
    })
    assert response.status_code == 200
    token = response.json()["access_token"]
    
    # Update Profile
    update_response = client.put("/profile", 
        json={"email": "new@example.com", "password": "newstrongpassword"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert update_response.status_code == 200
    
    # Verify new password is hashed securely (login works)
    login_response = client.post("/login", data={
        "username": "testuser",
        "password": "newstrongpassword"
    })
    assert login_response.status_code == 200

    # Ensure updated password wasn't stored in plaintext
    user = users_db["testuser"]
    assert user.hashed_password != "newstrongpassword"

def test_invalid_token_rejected():
    response = client.put("/profile", 
        json={"email": "hacked@example.com"},
        headers={"Authorization": "Bearer invalid_token_xyz"}
    )
    # The starter will fail here because it crashes (500) instead of handling gracefully (401)
    assert response.status_code == 401
