import logging
from typing import Any
from beanie import PydanticObjectId  # type: ignore
from bson.objectid import ObjectId  # type: ignore
from fastapi import APIRouter, Depends, HTTPException, status  # type: ignore

from auth.authenticate import authenticate
from database.database import Database
from models.user_model import DbUser
from models.note_model import Note, DbNote

logger = logging.getLogger(__name__)

note_router = APIRouter(tags=["Note"])

note_database = Database(DbNote)

user_database = Database(DbUser)


@note_router.get("/{user_id}")
async def get_notes(user_id: Any, user: str = Depends(authenticate)) -> dict:
    try:
        print(user_id)
        user_obj_id = ObjectId(user_id)
        print(user_obj_id)
        db_user = await user_database.get(user_obj_id)
        if not db_user:
            raise Exception
    except Exception:
        logger.warning(f"{user_id} is an invalid user id")
        raise HTTPException(status_code=400, detail="Invalid user id")
    if str(db_user.id) != user["sub"]:
        logger.warning(
            f"Unuathorized attempt to access other {db_user.email}'s notes by {user["email_id"]}"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Operation not allowed"
        )
    if db_user.role == "admin":
        notes = await note_database.get_all()
        logger.info(f"Viewing {len(notes)} notes")
    else:
        notes = await note_database.get_by_field("user_id", user_id)
        logger.info(f"Viewing {len(notes)} notes for {user["email_id"]}")
    return {"notes": notes}


@note_router.post("/", status_code=201)
async def create_note(note: Note, user: str = Depends(authenticate)) -> dict:
    logger.info(f"User {user["email_id"]} is creating a note.")
    if not note.text:
        logger.warning("Note must have text.")
        raise HTTPException(status_code=400, detail="Note must have text")
    new_note = DbNote(text=note.text, user_id=note.id)
    note_id = await note_database.save(new_note)
    logger.info(f"New note #{note_id} created.")
    return {"note created" : note.text}


@note_router.put("/")
async def update_note(note: Note, user: str = Depends(authenticate)) -> dict:
    logger.info(f"User {user["email_id"]} is updating event #{note.id}")
    try:
        note_to_update = await note_database.get(note.id)
        if not note_to_update:
            raise Exception
    except Exception:
        logger.warning(f"Note #{note.id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        )
    if note_to_update.user_id != user["sub"]:
        logger.warning(
            f"User {user["email_id"]} is not authorized to perform that operation"
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Operation not allowed"
        )
    await note_database.update(note.id, note)
    logger.info(f"Note #{note.id} is updated.")
    return {"message": "Note updated"}


@note_router.delete("/{note_id}")
async def delete_note(note_id: PydanticObjectId, user: str = Depends(authenticate)) -> dict:
    logger.info(f"User {user["email_id"]} is deleting note #{note_id}.")
    try:
        note_to_delete = await note_database.get(note_id)
        if not note_to_delete:
            raise Exception
    except Exception:
        logger.warning(f"Note #{note_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )
    if note_to_delete.user_id != user["sub"]:
        logger.warning(
            f"User {user["email_id"]} is not authorized to perform that operation"
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Operation not allowed"
        )
    note_to_delete = await note_database.delete(note_id)
    logger.info(f"Note #{note_id} is updated.")
    return {"message": "Note deleted successfully"}
