from sqlalchemy.orm import Session
from Entities.entry import Entry
from datetime import date
from typing import List ,Optional
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
#get entry by a date
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
def get_entries_by_date_range( db: Session, user_id: int,start_date: date,end_date: date) -> List[Entry]:
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