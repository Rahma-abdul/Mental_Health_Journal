from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData
# Define naming conventions for constraints
convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)
Base = declarative_base(metadata=metadata) 
from .user import User
from .mood import Mood
from .entry import Entry
from .todo_items import TodoItem
__all__ = [
    "User",
    "Mood",
    "Entry",
    "TodoItem"
]
from .relationships import setup_relationships
setup_relationships()