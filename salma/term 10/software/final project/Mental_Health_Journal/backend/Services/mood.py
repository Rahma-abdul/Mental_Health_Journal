from typing import Dict, List, Optional
from collections import defaultdict
from sqlalchemy import extract
from datetime import datetime
def get_user_mood_history(
        user_id: int, 
        year: int, 
        session
    ) -> Dict[int, List[Dict]]:
        """
        Get a user's mood history organized by month for a specific year
        
        Args:
            user_id: ID of the user
            year: Year to analyze
            session: SQLAlchemy session
            
        Returns:
            Dictionary where keys are months (1-12) and values are lists of mood entries
        """
        from Entities.entry import Entry
        from Entities.mood import Mood
        
        entries = session.query(Entry, Mood)\
            .join(Mood)\
            .filter(Entry.user_id == user_id)\
            .filter(extract('year', Entry.entry_date) == year)\
            .order_by(Entry.entry_date)\
            .all()

        mood_history = defaultdict(list)
        for entry, mood in entries:
            month = entry.entry_date.month
            mood_history[month].append({
                'date': entry.entry_date,
                # 'mood_id': mood.id,
                # 'mood_name': mood.name,
                'color': mood.color_code,
            })
        
        return dict(mood_history)
