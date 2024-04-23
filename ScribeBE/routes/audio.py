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
    # if audio.file.content_length > 15 * 1024 * 1024:
    #     logger.warning("this audio file > 15 MB!!!")
    #     raise HTTPException(status_code=404, detail="File size should not exceed 15 MB")
    new_audio = DbAudio(file=audio.file, text=audio.text)
    await audio_database.save(new_audio)
    logger.info(f"New audio file from {user["email_id"]} created")
    return {"detail": "successfully add new audio"}
