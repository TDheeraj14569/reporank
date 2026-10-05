from app.database import db_session
from app.models.product import Product

def reserve_stock(product_id: int, quantity: int):
    product = db_session.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")
    
    # BUG: Non-atomic read-then-write
    if product.stock >= quantity:
        product.stock -= quantity
        db_session.commit()
        return True
    return False
