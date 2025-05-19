from .auth import get_password_hash
from Entities.user import User

def create_user(db, username: str, email: str, password: str):
    hashed_password = get_password_hash(password)
    db_user = User(
        username=username,
        email=email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db, username: str):
    return db.query(User).filter(User.username == username).first()