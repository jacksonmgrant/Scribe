from beanie import Document  # type: ignore
from pydantic import BaseModel
from fastapi import UploadFile
from typing import Optional
from typing import BinaryIO

class Audio(BaseModel):
    type: str
    file: str  # change it later
    size: int
    text: str
    id: str

class DbAudio(Document):
    type: str
    file: str # change it later
    size: int
    text: str
    user_id: Optional[str] = None

    class Settings:
        name = "audio"
        keep_nulls = False

# file: str
# file: UploadFile