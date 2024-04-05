from datetime import datetime
from typing import Optional
from beanie import Document, Indexed
from pydantic import BaseModel

class Note(BaseModel):
    id: int
    text: str | None

class NoteUpdate(BaseModel):
    note_id: str
    text: str

class DbNote(Document):
    # May need to figure out how to manage a null text field coming from the FE
    text: str
    time: Indexed(datetime) = datetime.now() # type: ignore
    hasRecording: Optional[bool] = False
    
    class Settings:
        name = "notes"
        keep_nulls = False