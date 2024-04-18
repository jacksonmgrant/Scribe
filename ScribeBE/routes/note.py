# from datetime import datetime
from typing import Any
from auth.authenticate import authenticate
from beanie import PydanticObjectId  # type: ignore
from database.connection import Database
from fastapi import APIRouter, Depends, HTTPException, status  # type: ignore
from models.user_model import DbUser
from models.note_model import Note, DbNote


note_router = APIRouter(tags=["Note"])

note_database = Database(Note)


@note_router.get("/{user_id}")
async def get_notes(user_id: Any, user: str = Depends(authenticate)) -> dict:
    try:
        user_obj_id = PydanticObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user id")
    # update user database
    user = await DbUser.find_one(DbUser.id == user_obj_id)
    if user.role == "admin":
        notes = await note_database.get_all()
    else:
        # update user database
        notes = await DbNote.find(DbNote.user_id == user_id).to_list()
    return {"notes": notes}


@note_router.post("/new", status_code=201)
async def create_note(body: Note, user: str = Depends(authenticate)) -> dict:
    body.creator = user
    if not body:
        raise HTTPException(status_code=400, detail="Note must have text")
    await note_database.save(body)
    return {"message": "Note created successfully"}


@note_router.put("/{note_id}", response_model=Note)
async def update_note(
    id: PydanticObjectId, body: DbNote, user: str = Depends(authenticate)
) -> Note:
    print(id)
    note_to_update = await note_database.get(id)
    print(note_to_update)
    if not note_to_update:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
            )
    if note_to_update.creator != user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Operation not allowed"
        )
    updated_note = await note_database.update(id, body)
    if not updated_note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )
    return updated_note


@note_router.delete("/{note_id}")
async def delete_note(note_id: PydanticObjectId,
                      user: str = Depends(authenticate)) -> dict:
    note_to_delete = await note_database.get(note_id)
    if not note_to_delete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )
    if note_to_delete.creator != user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Operation not allowed"
        )
    note_to_delete = await note_database.delete(note_id)
    return {"message": "Note deleted successfully"}
