from datetime import datetime
from typing import Optional
from beanie import Document, Indexed  # type: ignore
from pydantic import BaseModel


class Note(BaseModel):
    id: str
    text: str | None


class DbNote(Document):
    text: str
    time: Indexed(datetime) = datetime.now()  # type: ignore
    recording_id: Optional[str] = None
    user_id: Optional[str] = None

    class Settings:
        name = "notes"
        keep_nulls = False
