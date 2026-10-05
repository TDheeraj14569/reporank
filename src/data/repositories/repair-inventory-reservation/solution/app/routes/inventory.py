from fastapi import APIRouter, Depends
from app.services.inventory_service import reserve_stock

router = APIRouter()

@router.post("/reserve")
def reserve(product_id: int, quantity: int):
    return reserve_stock(product_id, quantity)
