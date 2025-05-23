from sqlalchemy import Column, Integer, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func

from . import Base

class TodoItem(Base):
    __tablename__ = "todo_items"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    entry_id = Column(Integer, ForeignKey("entries.id"))
    description = Column(Text, nullable=False)
    is_completed = Column(Boolean, default=False)
    priority = Column(Integer, default=1)  
    deadline = Column(Text, nullable=False)


    # Relationships will be setup in relationships.py
    user = None
    entry = None

    def __repr__(self):
        return f"<TodoItem(id={self.id}, description='{self.description[:20]}...')>"