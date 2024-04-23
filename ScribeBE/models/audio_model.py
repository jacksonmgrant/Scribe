from beanie import Document  # type: ignore
from pydantic import BaseModel
from fastapi import UploadFile
from typing import Optional

class Audio(BaseModel):
    id: str
    file: str
    text: str

class DbAudio(Document):
    file: str
    text: str
    user_id: Optional[str] = None

    class Settings:
        name = "audio"
        keep_nulls = False