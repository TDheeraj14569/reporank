from fastapi import FastAPI
import hashlib
import json
from models import Product, ProductResponse

app = FastAPI(title="Duplicate Product Detection API")

# In-memory store of product hashes
product_hashes = set()

def normalize_value(v):
    if isinstance(v, dict):
        return normalize_dict(v)
    elif isinstance(v, list):
        return [normalize_value(x) for x in v]
    elif isinstance(v, str):
        return v.lower().strip()
    return v

def normalize_dict(d: dict):
    normalized = {}
    for k, v in d.items():
        key = k.lower().strip() if isinstance(k, str) else k
        normalized[key] = normalize_value(v)
    return normalized

def generate_product_hash(product: Product) -> str:
    # FIX: Normalize texts and sort keys
    normalized_name = product.name.lower().strip()
    normalized_brand = product.brand.lower().strip()
    normalized_attrs = normalize_dict(product.attributes)

    data = f"{normalized_name}|{normalized_brand}|{json.dumps(normalized_attrs, sort_keys=True)}"
    return hashlib.sha256(data.encode()).hexdigest()

@app.post("/products", response_model=ProductResponse)
def add_product(product: Product):
    product_hash = generate_product_hash(product)
    
    if product_hash in product_hashes:
        return ProductResponse(id=product_hash, message="Product is a duplicate", is_duplicate=True)
    
    product_hashes.add(product_hash)
    return ProductResponse(id=product_hash, message="Product added successfully", is_duplicate=False)

@app.delete("/products")
def clear_products():
    product_hashes.clear()
    return {"message": "All products cleared"}
