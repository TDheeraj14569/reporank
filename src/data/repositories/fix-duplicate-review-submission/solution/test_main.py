import pytest
from fastapi.testclient import TestClient
from main import app, reviews_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def reset_db():
    reviews_db.clear()
    import main
    main.current_id = 1
    yield

def test_create_review_success():
    response = client.post("/reviews", json={
        "user_id": 1,
        "product_id": 100,
        "rating": 5,
        "comment": "Great product!"
    })
    assert response.status_code == 201
    data = response.json()
    assert data["user_id"] == 1
    assert data["product_id"] == 100
    assert data["rating"] == 5

def test_duplicate_review_same_comment():
    client.post("/reviews", json={
        "user_id": 1,
        "product_id": 100,
        "rating": 5,
        "comment": "Great product!"
    })
    
    response = client.post("/reviews", json={
        "user_id": 1,
        "product_id": 100,
        "rating": 4,
        "comment": "Great product!"
    })
    assert response.status_code == 400
    assert response.json()["detail"] == "Duplicate review submission"

def test_duplicate_review_different_comment():
    client.post("/reviews", json={
        "user_id": 1,
        "product_id": 100,
        "rating": 5,
        "comment": "Great product!"
    })
    
    # User tries to submit another review for the same product, but with a different comment
    response = client.post("/reviews", json={
        "user_id": 1,
        "product_id": 100,
        "rating": 3,
        "comment": "Actually, it broke after a week."
    })
    
    # Should not be allowed. A user can only submit one review per product.
    assert response.status_code == 400
    assert response.json()["detail"] == "Duplicate review submission"

def test_different_users_can_review_same_product():
    client.post("/reviews", json={
        "user_id": 1,
        "product_id": 100,
        "rating": 5,
        "comment": "Great product!"
    })
    
    response = client.post("/reviews", json={
        "user_id": 2,
        "product_id": 100,
        "rating": 4,
        "comment": "It's okay."
    })
    assert response.status_code == 201

def test_same_user_can_review_different_products():
    client.post("/reviews", json={
        "user_id": 1,
        "product_id": 100,
        "rating": 5,
        "comment": "Great product!"
    })
    
    response = client.post("/reviews", json={
        "user_id": 1,
        "product_id": 101,
        "rating": 4,
        "comment": "Different product."
    })
    assert response.status_code == 201

def test_invalid_rating():
    response = client.post("/reviews", json={
        "user_id": 1,
        "product_id": 100,
        "rating": 6,
        "comment": "Invalid rating"
    })
    assert response.status_code == 400
    
    response = client.post("/reviews", json={
        "user_id": 1,
        "product_id": 100,
        "rating": 0,
        "comment": "Invalid rating"
    })
    assert response.status_code == 400
