from datetime import datetime
from typing import Any
from fastapi import APIRouter, HTTPException
from models.user_model import DbUser
from models.note_model import Note, DbNote
from bson.objectid import ObjectId

# This will be replaced with a database
note_list: list[Note] = []
current_id = 0


note_router = APIRouter()


@note_router.get("/{user_id}")
async def get_notes(user_id: Any) -> dict:
    # Cannot accept
    user_obj_id = ObjectId(user_id)
    user = await DbUser.find_one(DbUser.id == user_obj_id)
    if user is "admin":
        notes = await DbNote.find().to_list()
    elif user is None:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        notes = await DbNote.find(DbNote.user_id == user_obj_id).to_list()
    return {"notes": notes}

@note_router.post("/", status_code=201)
async def create_note(note_text: str, user_id: Any) -> dict:
    user_obj_id = ObjectId(user_id)
    if note_text['text'] is None or 'text' not in note_text:
        raise HTTPException(status_code=400, detail="Note must have text")
    new_note = DbNote(text=note_text['text'], user_id=user_obj_id)
    await new_note.insert()
    return {"note created" : note_text['text']}

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