from fastapi import FastAPI ,Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from Entities import Base
from config import engine
from sqlalchemy.orm import Session
from Services.user import get_user_by_username,create_user
from Services.auth import authenticate_user, create_access_token
from config import get_db, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from datetime import date
from Services.entry import create_entry,get_entries_by_date,get_entries_by_date_range
from Services.mood import get_user_mood_history
from Services.song_recommendation import SongRecommendationService

from typing import List, Optional,Dict

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Mood Journal API",
    description="API for daily mood tracking and journaling",
    version="1.0.0",
    openapi_url="/api/openapi.json",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str  
class EntryCreate(BaseModel):
    entry_date: date
    notes: Optional[str] = None
    mood_id: Optional[int] = None

class EntryResponse(BaseModel):
    id: int
    user_id: int
    entry_date: date
    notes: Optional[str]
    mood_id: Optional[int]

    class Config:
        orm_mode = True

class MoodHistoryResponse(BaseModel):
    date: date
    # mood_id: int
    # mood_name: str
    color: str   
    class Config:
        from_attributes = True     


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
@app.post("/token")
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")   
    # Create new user
    return create_user(
        db, 
        username=user.username, 
        email=user.email, 
        password=user.password
    )

# Endpoints
@app.post("/users/{user_id}/entries/", response_model=EntryResponse, status_code=status.HTTP_201_CREATED)
def create_entry_endpoint(
    user_id: int,
    entry_data: EntryCreate,
    db: Session = Depends(get_db)
):
    try:
        return create_entry(
            db=db,
            user_id=user_id,
            entry_date=entry_data.entry_date,
            notes=entry_data.notes,
            mood_id=entry_data.mood_id
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/users/{user_id}/entries/by-date/", response_model=List[EntryResponse])
def get_entries_by_date_endpoint(
    user_id: int,
    target_date: date,
    db: Session = Depends(get_db)
):
 
    return get_entries_by_date(
        db=db,
        user_id=user_id,
        target_date=target_date
    )

@app.get("/users/{user_id}/entries/by-date-range/", response_model=List[EntryResponse])
def get_entries_by_date_range_endpoint(
    user_id: int,
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db)
):
    return get_entries_by_date_range(
        db=db,
        user_id=user_id,
        start_date=start_date,
        end_date=end_date
    )
    
@app.get("/history/{user_id}/{year}", response_model=Dict[int, List[MoodHistoryResponse]])
async def get_mood_history(
    user_id: int,
    year: int,
    db: Session = Depends(get_db)
):
    """
    Get a user's mood history organized by month for a specific year
    
    - **user_id**: ID of the user
    - **year**: Year to analyze (e.g., 2023)
    """
    try:
        history = get_user_mood_history(user_id, year, db)
        return history
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


class SongRecommendationResponse(BaseModel):
    song_recommendation: Optional[str]
    entry_id: int
    success: bool
    message: Optional[str] = None

class MoodSongRequest(BaseModel):
    mood_name: str

@app.get("/users/{user_id}/entries/{entry_id}/song-recommendation", response_model=SongRecommendationResponse)
def get_song_recommendation_for_entry(
    user_id: int,
    entry_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a song recommendation based on a specific journal entry and its mood.
    """
    song_service = SongRecommendationService()
    
    try:
        recommendation = song_service.get_song_recommendation(db, entry_id, user_id)
        
        if recommendation:
            return SongRecommendationResponse(
                song_recommendation=recommendation,
                entry_id=entry_id,
                success=True,
                message="Song recommendation generated successfully"
            )
        else:
            return SongRecommendationResponse(
                song_recommendation=None,
                entry_id=entry_id,
                success=False,
                message="Could not generate song recommendation or entry not found"
            )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating song recommendation: {str(e)}"
        )

@app.post("/song-recommendation/by-mood", response_model=dict)
def get_song_recommendation_by_mood(
    mood_request: MoodSongRequest
):
    """
    Get a song recommendation based only on mood name.
    """
    song_service = SongRecommendationService()
    
    try:
        recommendation = song_service.get_song_recommendation_by_mood_only(mood_request.mood_name)
        
        if recommendation:
            return {
                "song_recommendation": recommendation,
                "mood": mood_request.mood_name,
                "success": True,
                "message": "Song recommendation generated successfully"
            }
        else:
            return {
                "song_recommendation": None,
                "mood": mood_request.mood_name,
                "success": False,
                "message": "Could not generate song recommendation"
            }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating song recommendation: {str(e)}"
        )
