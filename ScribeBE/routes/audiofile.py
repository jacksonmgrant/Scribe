from fastapi import APIRouter, HTTPException, UploadFile, Request
from models.audio_model import AudioFile, DbAudio
from bson import ObjectId
from typing import Optional
import logging
import asyncio
from typing import Optional

from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

from beanie import Document, Indexed, init_beanie

# Configure logging
logging.basicConfig(level=logging.DEBUG)  # Set desired logging level (e.g., DEBUG, INFO, WARNING)

# Use the logger within your application
logger = logging.getLogger(__name__)  # Use __name__ for the current module

  
  


#create new endpoint that takes in a file and stores it in the database

# then get the object_id created by Mongo and return that to the frontend
audio_router = APIRouter(tags=["Audio"])



#something = Database(DbAudio)


@audio_router.post("/", status_code=201)
async def receive_audio(file: UploadFile) -> dict:
    if file.content_type not in ["audio/wav", "audio/x-wav"]:
        raise HTTPException(status_code=400, detail="File must be a .wav file")
    audio_bytes = await file.read()
    # Need to figure out what type to use for the audio file
    # UploadFile doesn't work in MongoDB bc it is FastAPI specific
    new_audio = DbAudio(wavfile=audio_bytes)
    await new_audio.insert()
    return {"id" : new_audio.id}
