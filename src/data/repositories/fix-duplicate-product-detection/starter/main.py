from fastapi import FastAPI
import hashlib
import json
from models import Product, ProductResponse

app = FastAPI(title="Duplicate Product Detection API")

# In-memory store of product hashes
product_hashes = set()

def generate_product_hash(product: Product) -> str:
    # BUG: Does not normalize text, does not sort keys in attributes dict
    # This leads to identical products with different case or attribute order
    # being treated as different products.
    data = f"{product.name}|{product.brand}|{json.dumps(product.attributes)}"
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
