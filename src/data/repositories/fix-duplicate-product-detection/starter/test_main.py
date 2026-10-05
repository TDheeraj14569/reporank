import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

@pytest.fixture(autouse=True)
def run_around_tests():
    client.delete("/products")
    yield
    client.delete("/products")

def test_exact_duplicate():
    payload = {
        "name": "Wireless Mouse",
        "brand": "TechCorp",
        "attributes": {"color": "black", "wireless": True}
    }
    
    response1 = client.post("/products", json=payload)
    assert response1.status_code == 200
    assert response1.json()["is_duplicate"] == False
    
    response2 = client.post("/products", json=payload)
    assert response2.status_code == 200
    assert response2.json()["is_duplicate"] == True

def test_duplicate_different_attribute_order():
    payload1 = {
        "name": "Wireless Mouse",
        "brand": "TechCorp",
        "attributes": {"color": "black", "wireless": True}
    }
    payload2 = {
        "name": "Wireless Mouse",
        "brand": "TechCorp",
        "attributes": {"wireless": True, "color": "black"}
    }
    
    response1 = client.post("/products", json=payload1)
    assert response1.status_code == 200
    assert response1.json()["is_duplicate"] == False
    
    response2 = client.post("/products", json=payload2)
    assert response2.status_code == 200
    assert response2.json()["is_duplicate"] == True

def test_duplicate_case_insensitive():
    payload1 = {
        "name": "Wireless Mouse",
        "brand": "TechCorp",
        "attributes": {"color": "Black"}
    }
    payload2 = {
        "name": "wireless mouse  ",
        "brand": "  techcorp",
        "attributes": {"COLOR": " black "}
    }
    
    response1 = client.post("/products", json=payload1)
    assert response1.status_code == 200
    assert response1.json()["is_duplicate"] == False
    
    response2 = client.post("/products", json=payload2)
    assert response2.status_code == 200
    assert response2.json()["is_duplicate"] == True

def test_nested_attributes_duplicate():
    payload1 = {
        "name": "Gaming Laptop",
        "brand": "GamerZ",
        "attributes": {
            "specs": {
                "ram": "16GB",
                "storage": "1TB SSD"
            }
        }
    }
    payload2 = {
        "name": "Gaming Laptop",
        "brand": "GamerZ",
        "attributes": {
            "specs": {
                "storage": "1TB ssd",
                "ram": "16gb"
            }
        }
    }
    
    response1 = client.post("/products", json=payload1)
    assert response1.status_code == 200
    assert response1.json()["is_duplicate"] == False
    
    response2 = client.post("/products", json=payload2)
    assert response2.status_code == 200
    assert response2.json()["is_duplicate"] == True
