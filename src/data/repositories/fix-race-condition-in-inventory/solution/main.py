from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update
from sqlalchemy.future import select
from pydantic import BaseModel
from contextlib import asynccontextmanager

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
        
    # Atomic decrement to prevent race conditions
    stmt = (
        update(Product)
        .where(Product.id == req.product_id, Product.stock >= req.quantity)
        .values(stock=Product.stock - req.quantity)
    )
    update_result = await db.execute(stmt)
    
    if update_result.rowcount == 0:
        await db.rollback()
        raise HTTPException(status_code=409, detail="Conflict during reservation, please try again")
        
    await db.commit()
    return {"message": "Reservation successful"}
