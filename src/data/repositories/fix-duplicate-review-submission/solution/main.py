from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Review Service")

class ReviewCreate(BaseModel):
    user_id: int
    product_id: int
    rating: int
    comment: str

class ReviewResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    rating: int
    comment: str

# In-memory database
reviews_db: List[ReviewResponse] = []
current_id = 1

@app.post("/reviews", response_model=ReviewResponse, status_code=201)
async def create_review(review: ReviewCreate):
    global current_id
    
    if review.rating < 1 or review.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    # A user can only review a product once. Check for duplicates.
    existing_review = next(
        (r for r in reviews_db if r.product_id == review.product_id and r.user_id == review.user_id), 
        None
    )
    
    # Fix: any existing review for the same product by the same user is a duplicate
    if existing_review:
        raise HTTPException(status_code=400, detail="Duplicate review submission")

    new_review = ReviewResponse(
        id=current_id,
        user_id=review.user_id,
        product_id=review.product_id,
        rating=review.rating,
        comment=review.comment
    )
    reviews_db.append(new_review)
    current_id += 1
    
    return new_review

@app.get("/reviews", response_model=List[ReviewResponse])
async def get_reviews(product_id: Optional[int] = None):
    if product_id is not None:
        return [r for r in reviews_db if r.product_id == product_id]
    return reviews_db
