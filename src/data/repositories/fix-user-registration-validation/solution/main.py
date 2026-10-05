from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Dict, Optional

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

app = FastAPI(title="Identity Service")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Models
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3)
    email: EmailStr
    password: str = Field(..., min_length=8)

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8)

class UserInDB(BaseModel):
    username: str
    email: str
    hashed_password: str

users_db: Dict[str, UserInDB] = {}

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        if username not in users_db:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        return username
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )

@app.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    for existing_user in users_db.values():
        if existing_user.email == user.email:
            raise HTTPException(status_code=400, detail="Email already registered")
            
    hashed_pwd = get_password_hash(user.password)
    users_db[user.username] = UserInDB(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pwd
    )
    return {"message": "User registered successfully"}

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.put("/profile")
def update_profile(update_data: UserUpdate, current_user: str = Depends(get_current_user)):
    user = users_db[current_user]
    
    if update_data.email:
        for existing_user in users_db.values():
            if existing_user.email == update_data.email and existing_user.username != current_user:
                raise HTTPException(status_code=400, detail="Email already registered")
        user.email = update_data.email
        
    if update_data.password:
        user.hashed_password = get_password_hash(update_data.password)
        
    return {"message": "Profile updated successfully"}
