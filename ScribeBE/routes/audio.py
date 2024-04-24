import logging
from database.database import Database
from fastapi import APIRouter, Depends, HTTPException,UploadFile 
from auth.authenticate import authenticate
from models.audio_model import Audio,DbAudio

logger = logging.getLogger(__name__)

audio_router = APIRouter(tags=["Audio"])

audio_database = Database(DbAudio)

@audio_router.post("/", status_code=201)
async def recieve_audio(audio: Audio, user: str = Depends(authenticate)) -> dict:
    new_audio = DbAudio(name=audio.name,type= audio.type,file=audio.file,size=audio.size ,text=audio.text,user_id=audio.id)
    await audio_database.save(new_audio)
    logger.info(f"New audio file from {user["email_id"]} created")
    return {"detail": "successfully add new audio"}

