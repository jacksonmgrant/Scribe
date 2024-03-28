from datetime import datetime
from typing import Optional
from beanie import Document, Indexed
from pydantic import BaseModel

class Note(BaseModel):
    id: int
    text: str

class DbNote(Document):
    text: str
    time: Indexed(datetime) = datetime.now() # type: ignore
    hasRecording: Optional[bool] = False
    
    class Settings:
        name = "notes"
        keep_nulls = False