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


#### Code from ChatGPT

import pymongo
from bson.binary import Binary

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["audio_db"]
collection = db["audio_collection"]

def store_audio_file(file_path):
    with open(file_path, 'rb') as f:
        audio_data = f.read()
        audio_binary = Binary(audio_data)
        audio_doc = {
            "filename": file_path.split('/')[-1],
            "format": file_path.split('.')[-1],
            "data": audio_binary
        }
        collection.insert_one(audio_doc)
        print("Audio file stored successfully.")

def retrieve_audio_file(filename):
    audio_doc = collection.find_one({"filename": filename})
    if audio_doc:
        with open(filename, 'wb') as f:
            f.write(audio_doc['data'])
        print("Audio file retrieved successfully.")
    else:
        print("Audio file not found.")

# Example usage
store_audio_file("audio.wav")
retrieve_audio_file("audio.wav")

