from beanie import Document  # type: ignore
from pydantic import BaseModel
from fastapi import UploadFile, Form, File
# from typing import Optional
from typing import BinaryIO

class Audio(BaseModel):
    #name: str = Form(...)
    #type: str = Form(...)
    file: UploadFile = File(...)  
    #size: int = Form(...)
    #text: str = Form(...)
    #id: str = Form(...)

class DbAudio(Document):
    name: str = Form(...)
    #type: str = Form(...)
    file: UploadFile = File(...)  
    size: int = Form(...)
    #text: str = Form(...)
    #id: str = Form(...)

    class Settings:
        name = "audio"
        keep_nulls = False

# name: str
# type: str
# file: dict # change it later
# size: int
# text: str
# user_id: Optional[str] = None