from sqlalchemy.orm import relationship

def setup_relationships():
    """Establish all SQLAlchemy relationships between models"""
    from .user import User
    from .entry import Entry
    from .todo_items import TodoItem
    from .mood import Mood
    
    # User relationships
    User.entries = relationship("Entry", back_populates="user", cascade="all, delete-orphan")
    User.todos = relationship("TodoItem", back_populates="user", cascade="all, delete-orphan")
    
    # Entry relationships
    Entry.user = relationship("User", back_populates="entries")
    Entry.mood = relationship("Mood", back_populates="entries")
    Entry.todos = relationship("TodoItem", back_populates="entry", cascade="all, delete-orphan")
    
    # Mood relationships
    Mood.entries = relationship("Entry", back_populates="mood")
    
    # TodoItem relationships
    TodoItem.user = relationship("User", back_populates="todos")
    TodoItem.entry = relationship("Entry", back_populates="todos")