from sqlalchemy.orm import Session
from Entities.todo_items import TodoItem
def create_todo(
        db: Session,
        user_id: int,
        description: str,
        deadline: str,
        entry_id: int ,
         priority: int = 1,
          is_completed: bool = False  
    ):
        """
        Create a single todo item
        """
        todo = TodoItem(
            user_id=user_id,
            entry_id=entry_id,
              
            description=description,
            
            priority=priority,
            is_completed=is_completed,
            deadline=deadline
        )
        db.add(todo)
        db.commit()
        db.refresh(todo)
        return todo
def create_multiple_todos(
        db: Session,
        user_id: int,
        todos_data: list[dict],
        entry_id: int = None
    ):
        """
        Create multiple todo items at once
        Example todos_data:
        [
            {"description": "Buy milk", "priority": 2},
            {"description": "Call mom", "deadline": "2023-12-31"}
        ]
        """
        todos = []
        for todo_data in todos_data:
            todo = TodoItem(
                user_id=user_id,
                entry_id=entry_id,
                description=todo_data["description"],
                priority=todo_data.get("priority", 1),
                deadline=todo_data.get("deadline")
            )
            db.add(todo)
            todos.append(todo)
        
        db.commit()
        [db.refresh(todo) for todo in todos]
        return todos
