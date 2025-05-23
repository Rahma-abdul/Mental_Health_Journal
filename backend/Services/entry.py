from sqlalchemy.orm import Session
from Entities.entry import Entry
from datetime import date
from typing import List, Optional
from Entities.user import User
from Entities.mood import Mood

def create_entry(
    db: Session,
    user_id: int,
    entry_date: date,
    notes: Optional[str] = None,
    mood_id: Optional[int] = None
) -> Entry:
    """
    Create a new journal entry for a user.
        
    Raises:
        ValueError: If user or mood doesn't exist
    """
    # Validate user exists
    if not db.query(User).filter(User.id == user_id).first():
        raise ValueError(f"User with ID {user_id} not found")
    
    # Validate mood exists if provided
    if mood_id and not db.query(Mood).filter(Mood.id == mood_id).first():
        raise ValueError(f"Mood with ID {mood_id} not found")
    
    # Create the entry
    new_entry = Entry(
        user_id=user_id,
        entry_date=entry_date,
        notes=notes,
        mood_id=mood_id
    )
    
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    
    return new_entry

def get_entries_by_date(db: Session, user_id: int, target_date: date) -> List[Entry]:
    """
    Get all journal entries for a specific date.
    """
    return db.query(Entry)\
        .filter(
            Entry.user_id == user_id,
            Entry.entry_date == target_date
        )\
        .all() 

def get_entries_by_date_range(db: Session, user_id: int, start_date: date, end_date: date) -> List[Entry]:
    """
    Get all journal entries within a date range (inclusive).
    """
    return db.query(Entry)\
        .filter(
            Entry.user_id == user_id,
            Entry.entry_date >= start_date,
            Entry.entry_date <= end_date
        )\
        .all()

def get_entry_by_id(db: Session, entry_id: int, user_id: int) -> Optional[Entry]:
    """
    Get a specific entry by ID, ensuring it belongs to the user.
    """
    return db.query(Entry)\
        .filter(
            Entry.id == entry_id,
            Entry.user_id == user_id
        )\
        .first()

def update_entry(
    db: Session,
    entry_id: int,
    user_id: int,
    notes: Optional[str] = None,
    mood_id: Optional[int] = None
) -> Optional[Entry]:
    """
    Update an existing entry.
    """
    entry = get_entry_by_id(db, entry_id, user_id)
    if not entry:
        return None
    
    # Validate mood exists if provided
    if mood_id and not db.query(Mood).filter(Mood.id == mood_id).first():
        raise ValueError(f"Mood with ID {mood_id} not found")
    
    if notes is not None:
        entry.notes = notes
    if mood_id is not None:
        entry.mood_id = mood_id
    
    db.commit()
    db.refresh(entry)
    return entry

def delete_entry(db: Session, entry_id: int, user_id: int) -> bool:
    """
    Delete an entry. Returns True if deleted, False if not found.
    """
    entry = get_entry_by_id(db, entry_id, user_id)
    if not entry:
        return False
    
    db.delete(entry)
    db.commit()
    return True

