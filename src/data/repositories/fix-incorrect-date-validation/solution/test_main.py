import pytest
from fastapi.testclient import TestClient
from datetime import datetime, timedelta, timezone
from main import app

client = TestClient(app)

def test_create_event_naive_future():
    # Naive future date (assuming UTC)
    future_date = datetime.now(timezone.utc).replace(tzinfo=None) + timedelta(days=2)
    response = client.post("/events", json={
        "name": "Naive Future Event",
        "event_date": future_date.isoformat()
    })
    assert response.status_code == 200
    assert response.json()["name"] == "Naive Future Event"

def test_create_event_naive_past():
    # Naive past date (assuming UTC)
    past_date = datetime.now(timezone.utc).replace(tzinfo=None) - timedelta(days=1)
    response = client.post("/events", json={
        "name": "Naive Past Event",
        "event_date": past_date.isoformat()
    })
    assert response.status_code == 400

def test_create_event_aware_future():
    # Aware future date
    future_date = datetime.now(timezone.utc) + timedelta(days=2)
    response = client.post("/events", json={
        "name": "Aware Future Event",
        "event_date": future_date.isoformat()
    })
    assert response.status_code == 200
    assert response.json()["name"] == "Aware Future Event"

def test_create_event_aware_past():
    # Aware past date
    past_date = datetime.now(timezone.utc) - timedelta(days=1)
    response = client.post("/events", json={
        "name": "Aware Past Event",
        "event_date": past_date.isoformat()
    })
    assert response.status_code == 400
