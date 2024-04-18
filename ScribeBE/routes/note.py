# from datetime import datetime
import logging
from auth.authenticate import authenticate
from beanie import PydanticObjectId  # type: ignore
from database.connection import Database
from fastapi import APIRouter, Depends, HTTPException, status  # type: ignore
from models.user_model import DbUser
from models.note_model import Note, DbNote

logger = logging.getLogger(__name__)

note_router = APIRouter(tags=["Note"])

note_database = Database(Note)


@note_router.get("/{user_id}")
async def get_notes(user_id: PydanticObjectId,
                    user: str = Depends(authenticate)) -> dict:
    if not user_id:
        logger.warning(f"{user_id} is an invalid user id")
        raise HTTPException(status_code=400, detail="Invalid user id")
    # update user database
    user = await DbUser.find_one(DbUser.id == user_id)
    if user.role == "admin":
        notes = await note_database.get_all()
        logger.info(f"viewing {len(notes)} notes")
    else:
        # update user database
        notes = await DbNote.find(DbNote.user_id == user_id).to_list()
        logger.info(f"viewing {len(notes)} notes for {user.email}")
    return notes


@note_router.post("/new", status_code=201)
async def create_note(body: Note, user: str = Depends(authenticate)) -> dict:
    body.creator = user
    logger.info(f"User {user.email} is creating a note.")
    if not body:
        logger.warning("Note must have text.")
        raise HTTPException(status_code=400, detail="Note must have text")
    note_id = await note_database.save(body)
    logger.info(f"\t A new note #{note_id} created.")
    return {"message": "Note created successfully"}


@note_router.put("/{note_id}", response_model=Note)
async def update_note(
    note_id: PydanticObjectId, body: DbNote, user: str = Depends(authenticate)
) -> Note:
    logger.info(f"User {user.email} is updating event #{note_id}")
    note_to_update = await note_database.get(note_id)
    if not note_to_update:
        logger.warning(f"Note #{note_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
            )
    if note_to_update.creator != user:
        logger.warning(
            f"User {user.email} is not authorized to perform that operation"
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Operation not allowed"
        )
    updated_note = await note_database.update(note_id, body)
    if not updated_note:
        logger.warning(f"Note #{note_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )
    logger.info(f"\t Note #{note_id} is updated.")
    return updated_note


@note_router.delete("/{note_id}")
async def delete_note(note_id: PydanticObjectId,
                      user: str = Depends(authenticate)) -> dict:
    logger.info(f"User {user.email} is deleting note #{note_id}.")
    note_to_delete = await note_database.get(note_id)
    if not note_to_delete:
        logger.warning(f"Note #{note_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )
    if note_to_delete.creator != user:
        logger.warning(
            f"User {user.email} is not authorized to perform that operation"
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Operation not allowed"
        )
    note_to_delete = await note_database.delete(note_id)
    logger.info(f"\t Note #{note_id} is updated.")
    return {"message": "Note deleted successfully"}
