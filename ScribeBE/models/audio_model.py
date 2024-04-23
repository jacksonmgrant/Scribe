from beanie import Document  # type: ignore
from pydantic import BaseModel
from fastapi import UploadFile

class Audio(BaseModel):
    file: str
    text: str

class DbAudio(Document):
    file: str
    text: str

    class Settings:
        name = "audio"
        keep_nulls = False