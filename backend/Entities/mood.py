from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from . import Base

class Mood(Base):
    __tablename__ = "moods"

    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    color_code = Column(String(7), nullable=False)  # e.g. #FF0000
   

    # Relationship will be setup in relationships.py
    entries = None

    def __repr__(self):
        return f"<Mood(id={self.id}, name='{self.name}', color='{self.color_code}')>"