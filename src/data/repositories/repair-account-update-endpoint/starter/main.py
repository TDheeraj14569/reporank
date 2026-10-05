from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict
from passlib.context import CryptContext

app = FastAPI(title="Identity Service")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Mock database
fake_users_db: Dict[str, dict] = {}

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class UserResponse(BaseModel):
    username: str
    email: EmailStr

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

@app.post("/register", response_model=UserResponse)
def register(user: UserCreate):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user.password)
    user_dict = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password
    }
    fake_users_db[user.username] = user_dict
    return user_dict

@app.put("/users/{username}", response_model=UserResponse)
def update_user(username: str, user_update: UserUpdate):
    if username not in fake_users_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    stored_user_data = fake_users_db[username]
    
    if user_update.email:
        stored_user_data["email"] = user_update.email
        
    if user_update.password:
        # BUG: Storing password in plaintext instead of hashing it!
        stored_user_data["hashed_password"] = user_update.password 
        
    fake_users_db[username] = stored_user_data
    return stored_user_data
