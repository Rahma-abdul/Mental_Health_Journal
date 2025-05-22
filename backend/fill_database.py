"""
Script to populate the database with initial data
Run this script to add sample users, moods, entries, and todos
"""

from sqlalchemy.orm import Session
from config import SessionLocal
from Entities.user import User
from Entities.mood import Mood
from Entities.entry import Entry
from Entities.todo_items import TodoItem
from Services.auth import get_password_hash
from datetime import date, datetime, timedelta

def create_database_session():
    """Create and return a database session"""
    return SessionLocal()

def add_moods(db: Session):
    """Add predefined moods to the database"""
    moods_data = [
        {"name": "Happy", "color_code": "#FFD700"},      # Gold
        {"name": "Sad", "color_code": "#4169E1"},        # Royal Blue
        {"name": "Anxious", "color_code": "#FF6347"},    # Tomato
        {"name": "Calm", "color_code": "#98FB98"},       # Pale Green
        {"name": "Angry", "color_code": "#DC143C"},      # Crimson
        {"name": "Excited", "color_code": "#FF69B4"},    # Hot Pink
        {"name": "Tired", "color_code": "#696969"},      # Dim Gray
        {"name": "Grateful", "color_code": "#32CD32"},   # Lime Green
        {"name": "Lonely", "color_code": "#9370DB"},     # Medium Purple
        {"name": "Content", "color_code": "#87CEEB"}     # Sky Blue
    ]
    
    print("Adding moods...")
    for mood_data in moods_data:
        # Check if mood already exists
        existing_mood = db.query(Mood).filter(Mood.name == mood_data["name"]).first()
        if not existing_mood:
            mood = Mood(**mood_data)
            db.add(mood)
            print(f"  Added mood: {mood_data['name']}")
        else:
            print(f"  Mood already exists: {mood_data['name']}")
    
    db.commit()

def add_sample_users(db: Session):
    """Add sample users to the database"""
    users_data = [
        {"username": "john_doe", "email": "john@example.com", "password": "password123"},
        {"username": "jane_smith", "email": "jane@example.com", "password": "password123"},
        {"username": "mike_wilson", "email": "mike@example.com", "password": "password123"}
    ]
    
    print("Adding sample users...")
    for user_data in users_data:
        # Check if user already exists
        existing_user = db.query(User).filter(User.username == user_data["username"]).first()
        if not existing_user:
            hashed_password = get_password_hash(user_data["password"])
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                hashed_password=hashed_password
            )
            db.add(user)
            print(f"  Added user: {user_data['username']}")
        else:
            print(f"  User already exists: {user_data['username']}")
    
    db.commit()

def add_sample_entries(db: Session):
    """Add sample journal entries"""
    print("Adding sample entries...")
    
    # Get users and moods
    users = db.query(User).all()
    moods = db.query(Mood).all()
    
    if not users:
        print("  No users found. Add users first.")
        return
    
    if not moods:
        print("  No moods found. Add moods first.")
        return
    
    # Sample entries for the first user
    user = users[0]
    entries_data = [
        {
            "entry_date": date.today() - timedelta(days=5),
            "notes": "Had a wonderful day at the park with family. The weather was perfect!",
            "mood_id": next((m.id for m in moods if m.name == "Happy"), moods[0].id)
        },
        {
            "entry_date": date.today() - timedelta(days=4),
            "notes": "Feeling a bit overwhelmed with work deadlines approaching.",
            "mood_id": next((m.id for m in moods if m.name == "Anxious"), moods[0].id)
        },
        {
            "entry_date": date.today() - timedelta(days=3),
            "notes": "Practiced meditation for 20 minutes. Feeling much more centered.",
            "mood_id": next((m.id for m in moods if m.name == "Calm"), moods[0].id)
        },
        {
            "entry_date": date.today() - timedelta(days=2),
            "notes": "Completed a challenging project at work. Very satisfied with the results!",
            "mood_id": next((m.id for m in moods if m.name == "Excited"), moods[0].id)
        },
        {
            "entry_date": date.today() - timedelta(days=1),
            "notes": "Quiet evening reading a good book. Simple pleasures.",
            "mood_id": next((m.id for m in moods if m.name == "Content"), moods[0].id)
        }
    ]
    
    for entry_data in entries_data:
        entry = Entry(
            user_id=user.id,
            **entry_data
        )
        db.add(entry)
        print(f"  Added entry for {entry_data['entry_date']}")
    
    db.commit()

def add_sample_todos(db: Session):
    """Add sample todo items"""
    print("Adding sample todos...")
    
    # Get users and entries
    users = db.query(User).all()
    entries = db.query(Entry).all()
    
    if not users:
        print("  No users found. Add users first.")
        return
    
    user = users[0]
    
    todos_data = [
        {
            "description": "Buy groceries for the week",
            "priority": 2,
            "deadline": datetime.now() + timedelta(days=1),
            "entry_id": entries[0].id if entries else None
        },
        {
            "description": "Call mom to catch up",
            "priority": 1,
            "deadline": datetime.now() + timedelta(days=2),
            "entry_id": None
        },
        {
            "description": "Finish quarterly report",
            "priority": 3,
            "deadline": datetime.now() + timedelta(days=3),
            "entry_id": entries[1].id if len(entries) > 1 else None
        },
        {
            "description": "Schedule dentist appointment",
            "priority": 2,
            "deadline": datetime.now() + timedelta(weeks=1),
            "entry_id": None
        },
        {
            "description": "Plan weekend hiking trip",
            "priority": 1,
            "deadline": datetime.now() + timedelta(days=5),
            "entry_id": entries[2].id if len(entries) > 2 else None
        }
    ]
    
    for todo_data in todos_data:
        todo = TodoItem(
            user_id=user.id,
            **todo_data
        )
        db.add(todo)
        print(f"  Added todo: {todo_data['description']}")
    
    db.commit()

def main():
    """Main function to populate the database"""
    print("Starting database population...")
    
    db = create_database_session()
    
    try:
        # Add data in order (moods first, then users, then entries, then todos)
        add_moods(db)
        add_sample_users(db)
        add_sample_entries(db)
        add_sample_todos(db)
        
        print("\n✅ Database populated successfully!")
        print("\nSample data added:")
        print(f"  - Moods: {db.query(Mood).count()}")
        print(f"  - Users: {db.query(User).count()}")
        print(f"  - Entries: {db.query(Entry).count()}")
        print(f"  - Todos: {db.query(TodoItem).count()}")
        
        print("\nSample login credentials:")
        print("  Username: john_doe")
        print("  Password: password123")
        
    except Exception as e:
        print(f"❌ Error populating database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    main()