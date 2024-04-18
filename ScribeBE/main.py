from contextlib import asynccontextmanager
from functools import lru_cache
import logging
from fastapi import FastAPI, HTTPException, UploadFile, APIRouter  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from fastapi.responses import RedirectResponse  # type: ignore

from database.connection import Settings
from logging_setup import setup_logging
from models.note_model import DbNote
from routes.note import note_router
from routes.user import user_router
from routes.feedback import feedback_router
import transcriber

setup_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # on startup event
    logger.info("Application starts up...")
    await get_settings().initialize_database()
    yield
    # on shutdown event
    ...


@lru_cache
def get_settings():
    return Settings()


app = FastAPI(title="Scribe", version="0.1.0", lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

root_router = APIRouter()
transcription_router = APIRouter()


@root_router.get("/")
async def root():
    return RedirectResponse(url="/notes/")

allowed_content_types = ["audio/wav", "audio/x-wav"]


@transcription_router.post("/", status_code=201)
async def transcribe(file: UploadFile) -> dict:
    if file.content_type not in allowed_content_types:
        raise HTTPException(status_code=400, detail="File must be a .wav file")

    speech = transcriber.transcribe(file)

    if "ResultReason" in speech:
        raise HTTPException(status_code=500, detail=speech)

    new_note = DbNote(text=speech, hasRecording=True)
    await new_note.insert()
    return {"transcribed": speech}

# Register routes

app.include_router(root_router, tags=["Root"])
app.include_router(transcription_router, prefix="/transcribe",
                   tags=["Transcription"])
app.include_router(note_router, prefix="/notes")
app.include_router(user_router, prefix="/users")
app.include_router(feedback_router, prefix="/feedback")
