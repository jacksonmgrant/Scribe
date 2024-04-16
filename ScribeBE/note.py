from datetime import datetime
from typing import Any
from beanie import PydanticObjectId
from bson.objectid import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status
from database.connection import Database
from models.note_model import Note, DbNote

# This will be replaced with a database
note_list: list[Note] = []
current_id = 0


note_router = APIRouter()

note_database = Database(Note)


@note_router.get("/", response_model=list[Note])
async def get_notes() -> list[Note]:
    notes = await note_database.get_all()
    return notes


@note_router.get("/{note_id}", response_model=Note)
async def get_note(note_id: PydanticObjectId) -> Note:
    note = await note_database.get(note_id)
    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Note not found",
            )
    return note


@note_router.post("/", status_code=201)
async def create_note(note_text: dict) -> dict:
    if note_text['text'] is None or 'text' not in note_text:
        raise HTTPException(status_code=400, detail="Note must have text")
    new_note = DbNote(text=note_text['text'])
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