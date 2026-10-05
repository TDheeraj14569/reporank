from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None

class UserInDB(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str
