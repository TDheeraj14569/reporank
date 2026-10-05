import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app, get_db
from database import Base
import models

# Setup test database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_employee():
    response = client.post(
        "/employees/",
        json={
            "first_name": "John",
            "last_name": "Doe",
            "department": "Engineering",
            "role": "Senior Developer"
        },
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["first_name"] == "John"
    assert data["role"] == "Senior Developer"
    assert "id" in data

def test_read_employee():
    response = client.post(
        "/employees/",
        json={
            "first_name": "Jane",
            "last_name": "Smith",
            "department": "HR",
            "role": "Manager"
        },
    )
    assert response.status_code == 200
    emp_id = response.json()["id"]
    
    response = client.get(f"/employees/{emp_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == emp_id
    assert data["first_name"] == "Jane"
    assert data["role"] == "Manager"

def test_read_employees():
    response = client.get("/employees/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
