from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import Dict, Optional
import passlib.hash
from jose import JWTError, jwt

from models import UserCreate, UserUpdate, UserInDB, Token

app = FastAPI(title="Identity Service")

# Mock Database
users_db: Dict[str, UserInDB] = {}
user_id_counter = 1

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return passlib.hash.bcrypt.verify(plain_password, hashed_password)

def get_password_hash(password):
    return passlib.hash.bcrypt.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # FIX: Validate signature properly
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = users_db.get(username)
    if user is None:
        raise credentials_exception
    return user

@app.post("/register", response_model=UserInDB, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user.password)
    
    global user_id_counter
    db_user = UserInDB(
        id=user_id_counter,
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    users_db[user.username] = db_user
    user_id_counter += 1
    return db_user

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.put("/users/me", response_model=UserInDB)
async def update_user_profile(user_update: UserUpdate, current_user: UserInDB = Depends(get_current_user)):
    # FIX: Sanitize and validate input thoroughly
    if user_update.email is not None:
        for username, u in users_db.items():
            if u.email == user_update.email and username != current_user.username:
                raise HTTPException(status_code=400, detail="Email already registered")
        current_user.email = user_update.email
        
    if user_update.full_name is not None:
        if len(user_update.full_name.strip()) == 0:
            raise HTTPException(status_code=400, detail="Full name cannot be empty")
        current_user.full_name = user_update.full_name.strip()
        
    if user_update.password is not None:
        if len(user_update.password) < 6:
            raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
        # FIX: Password is hashed when updated
        current_user.hashed_password = get_password_hash(user_update.password)

    users_db[current_user.username] = current_user
    return current_user
