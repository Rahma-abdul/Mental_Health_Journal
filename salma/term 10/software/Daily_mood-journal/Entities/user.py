from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from . import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(128), nullable=False)


    # Relationships will be setup in relationships.py
    entries = None
    todos = None
    mood=None


    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"