from pydantic import BaseModel
from typing import Dict, Any

class Product(BaseModel):
    name: str
    brand: str
    attributes: Dict[str, Any]

class ProductResponse(BaseModel):
    id: str
    message: str
    is_duplicate: bool
