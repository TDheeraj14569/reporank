from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from contextlib import asynccontextmanager
import asyncio

from database import get_db, init_db
from models import Product

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

class ReservationRequest(BaseModel):
    product_id: int
    quantity: int

@app.post("/reserve")
async def reserve_stock(req: ReservationRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product).where(Product.id == req.product_id))
    product = result.scalars().first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    if product.stock < req.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")
        
    # Simulate a slow process (e.g. communicating with payment gateway)
    # This exposes a critical race condition.
    await asyncio.sleep(0.1)
    
    product.stock -= req.quantity
    await db.commit()
    return {"message": "Reservation successful"}
