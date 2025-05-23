import google.generativeai as genai
from config import GEMINI_API_KEY
from sqlalchemy.orm import Session
from Entities.entry import Entry
from Entities.mood import Mood
from typing import Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SongRecommendationService:
    def __init__(self):
        genai.configure(api_key=GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
    
    def get_song_recommendation(self, db: Session, entry_id: int, user_id: int) -> Optional[str]:
        """
        Get a song recommendation based on entry notes and mood.
        
        Args:
            db: Database session
            entry_id: ID of the journal entry
            user_id: ID of the user (for security)
            
        Returns:
            Song recommendation as a string or None if entry not found
        """
        try:
            # Get the entry with its mood
            entry = db.query(Entry).filter(
                Entry.id == entry_id,
                Entry.user_id == user_id
            ).first()
            
            if not entry:
                logger.warning(f"Entry {entry_id} not found for user {user_id}")
                return None
            
            # Get mood information
            mood_name = "neutral"
            if entry.mood_id:
                mood = db.query(Mood).filter(Mood.id == entry.mood_id).first()
                if mood:
                    mood_name = mood.name
            
            # Prepare the prompt for Gemini
            prompt = self._create_prompt(entry.notes, mood_name)
            
            # Get recommendation from Gemini
            response = self.model.generate_content(prompt)
            
            return response.text.strip()
            
        except Exception as e:
            logger.error(f"Error getting song recommendation: {str(e)}")
            return None
    
    def _create_prompt(self, notes: Optional[str], mood_name: str) -> str:
        """
        Create a prompt for Gemini API based on notes and mood.
        
        Args:
            notes: User's journal notes
            mood_name: Name of the mood
            
        Returns:
            Formatted prompt string
        """
        base_prompt = f"""Based on the following mood and journal entry, suggest ONE song that matches the emotional state. 
The song can be in Arabic or English. Please respond with ONLY the song name and artist in this format: "Song Name - Artist Name"

Mood: {mood_name}"""
        
        if notes and notes.strip():
            base_prompt += f"\nJournal Entry: {notes}"
        else:
            base_prompt += "\nJournal Entry: No specific notes provided."
        
        base_prompt += """\n\nPlease suggest a song that would resonate with this emotional state and situation. Consider both the mood and the context from the journal entry."""
        
        return base_prompt
    
    def get_song_recommendation_by_mood_only(self, mood_name: str) -> Optional[str]:
        """
        Get a song recommendation based only on mood name.
        
        Args:
            mood_name: Name of the mood
            
        Returns:
            Song recommendation as a string
        """
        try:
            prompt = f"""Suggest ONE song that matches the mood "{mood_name}". 
The song can be in Arabic or English. Please respond with ONLY the song name and artist in this format: "Song Name - Artist Name"

Consider songs that would resonate with someone feeling {mood_name}."""
            
            response = self.client.models.generate_content(
                model="gemini-1.5-flash",
                contents=prompt
            )
            
            return response.text.strip()
            
        except Exception as e:
            logger.error(f"Error getting song recommendation by mood: {str(e)}")
            return None