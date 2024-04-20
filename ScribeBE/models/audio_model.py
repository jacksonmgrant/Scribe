from datetime import datetime
from typing import Optional
from beanie import Document, Indexed
from pydantic import BaseModel
from fastapi import UploadFile
#from bson import ObjectId

  

class AudioFile(BaseModel):
    user_id: str
    id: str | None
    #audio: UploadFile | None

class DbAudio(Document):
    # Need to figure out what type to use for the audio file
    wavfile: bytes
    time: Indexed(datetime) = datetime.now() # type: ignore
 
    class Settings:
        name = "audio"
        keep_nulls = False