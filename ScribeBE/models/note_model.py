from datetime import datetime
from typing import Optional
from beanie import Document
from pydantic import BaseModel
import pymongo

class Note(BaseModel):
    id: int
    text: str

class DbNote(Document):
    text: str
    time: datetime = datetime.now()
    hasRecording: Optional[bool] = False
    
    class Settings:
        name = "notes"
        indexes = [("time", pymongo.DESCENDING)]
        keep_nulls = False