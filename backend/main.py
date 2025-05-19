from fastapi import FastAPI ,Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from Entities import Base
from config import engine
from sqlalchemy.orm import Session
from Services.user import get_user_by_username,create_user
from Services.auth import authenticate_user, create_access_token
from config import get_db, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
# from .routers import auth, users, moods, entries, todos

# Create all database tables (in production, you would use migrations instead)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Mood Journal API",
    description="API for daily mood tracking and journaling",
    version="1.0.0",
    openapi_url="/api/openapi.json",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
@app.post("/token")
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
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
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str  

@app.post("/users/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")   
    # Create new user
    return create_user(
        db, 
        username=user.username, 
        email=user.email, 
        password=user.password
    )