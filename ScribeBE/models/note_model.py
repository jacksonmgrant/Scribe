from datetime import datetime
from typing import Optional
from beanie import Document, Indexed
from pydantic import BaseModel
from bson.objectid import ObjectId

class Note(BaseModel):
    id: str
    text: str | None
    recording_id: str | None

class DbNote(Document):
    text: str
    time: Indexed(datetime) = datetime.now() # type: ignore
    recording_id: Optional[str] = None
    user_id: Optional[str] = None
    
    class Settings:
        name = "notes"
        keep_nulls = False