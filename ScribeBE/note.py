from fastapi import APIRouter, HTTPException

from models.note_model import Note, DbNote

# This will be replaced with a database
note_list: list[Note] = []
current_id = 0


note_router = APIRouter()


@note_router.get("/")
async def get_notes() -> dict:
    notes = await DbNote.find_all()
    return {"notes": notes}

@note_router.get("/{note_id}")
async def get_note(note_id: int) -> dict:
    for note in note_list:
        if note.id == note_id:
            return {"note" : note}
    raise HTTPException(status_code=404, detail="Note not found")

@note_router.post("/", status_code=201)
async def create_note(note: Note) -> dict:
    new_note = DbNote(text=note.text)
    await new_note.insert()
    return {"note" : note}

@note_router.put("/{note_id}")
async def update_note(note_id: int, note: Note) -> dict:
    for i in range(len(note_list)):
        if note_list[i].id == note_id:
            note_list[i] = note
            return {"note" : note}
    raise HTTPException(status_code=404, detail="Note not found")

@note_router.delete("/{note_id}")
async def delete_note(note_id: int) -> dict:
    for i in range(len(note_list)):
        if note_list[i].id == note_id:
            note_list.pop(i)
            return {"message" : "Note deleted"}
    raise HTTPException(status_code=404, detail="Note not found")