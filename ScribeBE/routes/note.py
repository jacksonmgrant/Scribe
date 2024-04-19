from datetime import datetime
from typing import Any
from fastapi import APIRouter, HTTPException
from models.user_model import DbUser
from models.note_model import Note, DbNote
from bson.objectid import ObjectId
import logging
from typing import Optional


# Configure logging
logging.basicConfig(level=logging.DEBUG)  # Set desired logging level (e.g., DEBUG, INFO, WARNING)

# Use the logger within your application
logger = logging.getLogger(__name__)  # Use __name__ for the current module


note_router = APIRouter(tags=["Note"])

@note_router.get("/{user_id}")
async def get_notes(user_id: Any) -> dict:
    try:
        user_obj_id = ObjectId(user_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid user id")
    user = await DbUser.find_one(DbUser.id == user_obj_id)
    if user.role == "admin":
        notes = await DbNote.find().to_list()
    else:
        notes = await DbNote.find(DbNote.user_id == user_id).to_list()
    return {"notes": notes}

@note_router.post("/", status_code=201)
async def create_note(note: Note) -> dict:
    if note.text is None:
        raise HTTPException(status_code=400, detail="Note must have text")
    if note.recording_id is None:
        new_note = DbNote(text=note.text, user_id=note.id)
    else:
        new_note = DbNote(text=note.text, user_id=note.id,recording_id=note.recording_id)
    await new_note.insert()
    return {"note created" : note.text}

@note_router.put("/")
async def update_note(note: Note) -> dict:
    note_obj_id = ObjectId(note.id)
    print(note_obj_id)
    note_to_update = await DbNote.find_one(DbNote.id == note_obj_id)
    print(note_to_update)
    if note_to_update is None:
        raise HTTPException(status_code=404, detail="Note not found") 
    await note_to_update.update({"$set": {DbNote.text: note.text, DbNote.time: datetime.now()}})
    return {"message": "Note updated"}

@note_router.delete("/{note_id}")
async def delete_note(note_id: Any) -> dict:
    note_obj_id = ObjectId(note_id)
    note_to_delete = await DbNote.find_one(DbNote.id == note_obj_id)
    if note_to_delete is None:
        raise HTTPException(status_code=404, detail="Note not found")
    await note_to_delete.delete()
    return {"message" : "Note deleted"}


@note_router.post("/returnWithID", status_code=201)
async def create_note_2(note: Note) -> dict:
    if note.text is None:
        raise HTTPException(status_code=400, detail="Note must have text")
    new_id = str(ObjectId())
    new_note = DbNote(text=note.text, user_id=note.id, recording_id=str(new_id))
    await new_note.insert()
    return {"note_created" : note.text, "noteID" : new_id}
