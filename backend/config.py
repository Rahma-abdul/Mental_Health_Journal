from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:1234@localhost/journalDB"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# JWT Configuration
SECRET_KEY = "your-secret-key-here"  # Change this to a strong secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Gemini API Configuration
GEMINI_API_KEY = "AIzaSyA56Ead1Ha8S0hN_V7HjKSdjckggUBr7nA"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()