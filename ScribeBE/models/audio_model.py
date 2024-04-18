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
    wavfile: UploadFile
    time: Indexed(datetime) = datetime.now() # type: ignore
    # no recording id, I think that's the object Id that gets sent to notes, yeah?
    note_id: str
    user_id: Optional[str] = None
 
    class Settings:
        name = "audio"
        keep_nulls = False