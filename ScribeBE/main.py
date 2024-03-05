from fastapi import FastAPI, HTTPException, UploadFile, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from model import Note
import note
import transcriber

app = FastAPI()

# Add CORS middleware to allow for cross-origin requests
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
    return {"message": "Hello World"}

#Will likely need to update this
allowed_content_types = ["audio/wav", "audio/x-wav"]

@transcription_router.post("/", status_code=201)
async def transcribe(file: UploadFile) -> dict:
    if file.content_type not in allowed_content_types:
        raise HTTPException(status_code=400, detail="File must be a .wav file")
    
    speech = transcriber.transcribe(file)

    #This error reporting not working right now
    if "ResultReason" in speech:
        raise HTTPException(status_code=500, detail=speech)
    
    note.note_list.append(Note(id=note.current_id, text=speech))
    note.current_id += 1
    return {"transcribed" : speech}

@transcription_router.get("/test")
async def transcribe_test(file: str):
    return transcriber.transcribe(file)

app.include_router(root_router, tags=["Root"])
app.include_router(transcription_router, prefix="/transcribe", tags=["Transcription"])
app.include_router(note.note_router, prefix="/notes", tags=["Note"])
