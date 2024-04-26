import logging
from database.database import Database
from fastapi import APIRouter, Depends, HTTPException,UploadFile 
from auth.authenticate import authenticate
from models.audio_model import DbAudio
from bson.binary import Binary
from database.database import Database


logger = logging.getLogger(__name__)

audio_router = APIRouter(tags=["Audio"])

audio_database = Database(DbAudio)

@audio_router.post("/", status_code=201)
async def recieve_audio(audio: UploadFile, user: str = Depends(authenticate)) -> dict:
    
    audio_doc = get_audio_file(audio.file)
    audio_instance = DbAudio(**audio_doc)

    await audio_database.save(audio_instance)

    logger.info(f"New audio file from {user["email_id"]} created")
    return {"detail": "successfully add new audio"}


def get_audio_file(audio) -> dict:
    audio_data = audio.read()
    audio_binary = Binary(audio_data)
    audio_doc = {
        "file": {
            "data": audio_binary,
            "format": "wav"
        }
    }
    return audio_doc

# def retrieve_audio_file(filename):
#     audio_doc = collection.find_one({"filename": filename})
#     if audio_doc:
#         with open(filename, 'wb') as f:
#             f.write(audio_doc['data'])
#         print("Audio file retrieved successfully.")
#     else:
#         print("Audio file not found.")
