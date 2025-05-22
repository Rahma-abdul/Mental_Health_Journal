from sqlalchemy.orm import Session
from Entities.todo_items import TodoItem
from Entities.user import User
from Entities.entry import Entry
from datetime import datetime
from typing import List, Optional

def create_todo(
    db: Session,
    user_id: int,
    description: str,
    entry_id: Optional[int] = None,
    priority: int = 1,
    deadline: Optional[datetime] = None
) -> TodoItem:
    """
    Create a new todo item.
    
    Args:
        db: Database session
        user_id: ID of the user creating the todo
        description: Todo description
        entry_id: Optional journal entry ID to associate with
        priority: Priority level (1=Low, 2=Medium, 3=High)
        deadline: Optional deadline datetime
        
    Raises:
        ValueError: If user or entry doesn't exist
    """
    # Validate user exists
    if not db.query(User).filter(User.id == user_id).first():
        raise ValueError(f"User with ID {user_id} not found")
    
    # Validate entry exists if provided
    if entry_id and not db.query(Entry).filter(Entry.id == entry_id, Entry.user_id == user_id).first():
        raise ValueError(f"Entry with ID {entry_id} not found or doesn't belong to user")
    
    # Validate priority
    if priority not in [1, 2, 3]:
        raise ValueError("Priority must be 1 (Low), 2 (Medium), or 3 (High)")
    
    new_todo = TodoItem(
        user_id=user_id,
        description=description,
        entry_id=entry_id,
        priority=priority,
        deadline=deadline
    )
    
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    
    return new_todo

def get_todos_by_user(db: Session, user_id: int) -> List[TodoItem]:
    """Get all todos for a user."""
    return db.query(TodoItem)\
        .filter(TodoItem.user_id == user_id)\
        .order_by(TodoItem.priority.desc(), TodoItem.deadline)\
        .all()

def get_todos_by_entry(db: Session, entry_id: int, user_id: int) -> List[TodoItem]:
    """Get all todos associated with a specific entry."""
    return db.query(TodoItem)\
        .filter(
            TodoItem.entry_id == entry_id,
            TodoItem.user_id == user_id
        )\
        .order_by(TodoItem.priority.desc())\
        .all()

def get_todo_by_id(db: Session, todo_id: int, user_id: int) -> Optional[TodoItem]:
    """Get a specific todo by ID, ensuring it belongs to the user."""
    return db.query(TodoItem)\
        .filter(
            TodoItem.id == todo_id,
            TodoItem.user_id == user_id
        )\
        .first()

def update_todo(
    db: Session,
    todo_id: int,
    user_id: int,
    description: Optional[str] = None,
    is_completed: Optional[bool] = None,
    priority: Optional[int] = None,
    deadline: Optional[datetime] = None
) -> Optional[TodoItem]:
    """Update an existing todo item."""
    todo = get_todo_by_id(db, todo_id, user_id)
    if not todo:
        return None
    
    # Validate priority if provided
    if priority is not None and priority not in [1, 2, 3]:
        raise ValueError("Priority must be 1 (Low), 2 (Medium), or 3 (High)")
    
    if description is not None:
        todo.description = description
    if is_completed is not None:
        todo.is_completed = is_completed
    if priority is not None:
        todo.priority = priority
    if deadline is not None:
        todo.deadline = deadline
    
    db.commit()
    db.refresh(todo)
    return todo

def delete_todo(db: Session, todo_id: int, user_id: int) -> bool:
    """Delete a todo item. Returns True if deleted, False if not found."""
    todo = get_todo_by_id(db, todo_id, user_id)
    if not todo:
        return False
    
    db.delete(todo)
    db.commit()
    return True

def get_pending_todos(db: Session, user_id: int) -> List[TodoItem]:
    """Get all incomplete todos for a user."""
    return db.query(TodoItem)\
        .filter(
            TodoItem.user_id == user_id,
            TodoItem.is_completed == False
        )\
        .order_by(TodoItem.priority.desc(), TodoItem.deadline)\
        .all()

def get_completed_todos(db: Session, user_id: int) -> List[TodoItem]:
    """Get all completed todos for a user."""
    return db.query(TodoItem)\
        .filter(
            TodoItem.user_id == user_id,
            TodoItem.is_completed == True
        )\
        .order_by(TodoItem.priority.desc())\
        .all()