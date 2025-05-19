from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.sql import func

from . import Base

class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    mood_id = Column(Integer, ForeignKey("moods.id"))
    entry_date = Column(Date, nullable=False)
    notes = Column(Text)
    # Relationships will be setup in relationships.py
    user = None
    mood = None
    todos = None

    def __repr__(self):
        return f"<Entry(id={self.id}, date='{self.entry_date}', user_id={self.user_id})>"