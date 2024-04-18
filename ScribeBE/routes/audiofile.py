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
audio_router = APIRouter(tags=["audio"])



#something = Database(DbAudio)

@audio_router.post("/s",status_code=201)
async def poopie(request: Request) -> dict:
    return {"big black balls": " i love balls"}

@audio_router.post("/", status_code=201)
async def receive_audio(request: Request) -> dict:
    try:
        form_data = await request.form()
        user_id = form_data["user_id"]
        id = form_data["id"]
        audio = form_data["audio"]
        if not (user_id or audio or id):
            raise HTTPException(status_code=400, detail=f"Missing required fields: {', '.join([field for field in ['user_id', 'audio', 'id'] if not field])}")
        new_audio = DbAudio(wavfile=audio,user_id=user_id,_id=id)
        #await new_audio.insert()
    except Exception as e:
        await(logger.exception(e))
    return {"success" : "I hope"}

@audio_router.post("/reem", status_code=201)
async def testicles(request: Request) -> dict:
    # Access form data using request.form()
    form_data = await request.form()
    user_id = form_data["user_id"]
    id = form_data["id"]
    audio = form_data["audio"]
    if audio:
        logging.info("audio exists")
    logging.info(f"Received user_id: {user_id}, id: {id}")

    return {"oops": "big fard"}

# do we want users sending audio data to backend first (notes matching to audio) or

# or do we want users to create a note first, then match it with audio? (audio matching to notes)
