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
    bytes_to_megabytes = 1000000
    if (audio.size / bytes_to_megabytes > 15):
        logger.warning("Audio files can not exceed 15 MB")
        raise HTTPException(status_code=400, detail="Audio files exceed 15 MB")
    #new_audio = DbAudio(name=audio.filename, file=audio.file, size=audio.size)
    #await audio_database.save(new_audio)
    logger.info(f"New audio file from {user["email_id"]} created")
    return {"detail": "successfully add new audio"}


def store_audio_file(audio):
    audio_database = Database(DbAudio)
    audio_data = audio.read()
    audio_binary = Binary(audio_data)
    audio_doc = {
        "format": "wav",
        "data": audio_binary
    }
    print(type(audio_doc))
    #audio_database.insert_one(audio_doc)
    print("Audio file stored successfully.")

def retrieve_audio_file(filename):
    audio_doc = collection.find_one({"filename": filename})
    if audio_doc:
        with open(filename, 'wb') as f:
            f.write(audio_doc['data'])
        print("Audio file retrieved successfully.")
    else:
        print("Audio file not found.")

