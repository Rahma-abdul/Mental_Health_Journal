# from Entities import Base, User, Mood, Entry, TodoItem
# from sqlalchemy import create_engine

# engine = create_engine("postgresql://postgres:salma123@localhost/journalDB")
# Base.metadata.create_all(bind=engine)
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:salma123@localhost/journalDB"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# JWT Configuration
SECRET_KEY = "your-secret-key-here"  # Change this to a strong secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()