import pytest
import asyncio
from httpx import AsyncClient, ASGITransport
from main import app
from database import engine, Base, AsyncSessionLocal
from models import Product

@pytest.fixture(autouse=True)
async def setup_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as session:
        session.add(Product(id=1, name="Laptop", stock=10))
        await session.commit()
        
    yield

@pytest.mark.asyncio
async def test_concurrent_reservations():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        reqs = [client.post("/reserve", json={"product_id": 1, "quantity": 1}) for _ in range(15)]
        responses = await asyncio.gather(*reqs)
        
        successes = [r for r in responses if r.status_code == 200]
        assert len(successes) == 10, f"Expected exactly 10 successful reservations, got {len(successes)}"
        
        async with AsyncSessionLocal() as session:
            product = await session.get(Product, 1)
            assert product.stock == 0

@pytest.mark.asyncio
async def test_reserve_not_enough_stock():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/reserve", json={"product_id": 1, "quantity": 20})
        assert response.status_code == 400
