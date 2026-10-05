import pytest
from fastapi.testclient import TestClient
from main import app, users_db
from jose import jwt

client = TestClient(app)

@pytest.fixture(autouse=True)
def reset_db():
    users_db.clear()
    yield

def test_register_user():
    response = client.post("/register", json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"
    assert "password" not in data

def test_token_verification():
    # Register
    client.post("/register", json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123"
    })
    
    # Create forged token (signed with wrong key)
    forged_token = jwt.encode({"sub": "testuser"}, "wrongkey", algorithm="HS256")
    
    # Try to access protected endpoint
    response = client.put("/users/me", 
        headers={"Authorization": f"Bearer {forged_token}"},
        json={"full_name": "Hacker"}
    )
    # Should be rejected because of invalid signature
    assert response.status_code == 401

def test_update_profile_hashes_password():
    # Register and login
    client.post("/register", json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123"
    })
    login_response = client.post("/token", data={
        "username": "testuser",
        "password": "password123"
    })
    token = login_response.json()["access_token"]
    
    # Update password
    response = client.put("/users/me",
        headers={"Authorization": f"Bearer {token}"},
        json={"password": "newpassword456"}
    )
    assert response.status_code == 200
    
    # Check if new password works
    login_response2 = client.post("/token", data={
        "username": "testuser",
        "password": "newpassword456"
    })
    assert login_response2.status_code == 200
    
    # Check if old password fails
    login_response3 = client.post("/token", data={
        "username": "testuser",
        "password": "password123"
    })
    assert login_response3.status_code == 401

def test_update_profile_validation():
    # Register two users
    client.post("/register", json={
        "username": "testuser1",
        "email": "user1@example.com",
        "password": "password123"
    })
    client.post("/register", json={
        "username": "testuser2",
        "email": "user2@example.com",
        "password": "password123"
    })
    
    login_response = client.post("/token", data={
        "username": "testuser1",
        "password": "password123"
    })
    token = login_response.json()["access_token"]
    
    # Try to update to existing email
    response = client.put("/users/me",
        headers={"Authorization": f"Bearer {token}"},
        json={"email": "user2@example.com"}
    )
    assert response.status_code == 400

    # Try to update with empty name
    response = client.put("/users/me",
        headers={"Authorization": f"Bearer {token}"},
        json={"full_name": "   "}
    )
    assert response.status_code == 400

    # Try to update with short password
    response = client.put("/users/me",
        headers={"Authorization": f"Bearer {token}"},
        json={"password": "short"}
    )
    assert response.status_code == 400
