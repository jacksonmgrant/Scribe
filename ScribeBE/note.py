from fastapi import APIRouter, HTTPException
from models.note_model import Note, DbNote
from bson.objectid import ObjectId

# This will be replaced with a database
note_list: list[Note] = []
current_id = 0


note_router = APIRouter()


@note_router.get("/")
async def get_notes() -> dict:
    notes = await DbNote.find().to_list()
    return {"notes": notes}

@note_router.get("/{note_id}")
async def get_note(note_id: int) -> dict:
    for note in note_list:
        if note.id == note_id:
            return {"note" : note}
    raise HTTPException(status_code=404, detail="Note not found")

@note_router.post("/", status_code=201)
async def create_note(note_text: dict) -> dict:
    if note_text['text'] is None or 'text' not in note_text:
        raise HTTPException(status_code=400, detail="Note must have text")
    new_note = DbNote(text=note_text['text'])
    # Insertion not working
    await new_note.insert()
    return {"note" : note_text['text']}

### Nithi : in mongodb id datatype is objectId which is not int. look at mongodb compass ###
###################################################################
@note_router.put("/{note_id}")
async def update_note(note_id: str, note: Note) -> dict:
    note_obj_id = ObjectId(note_id)
    note_to_update = await DbNote.find_one(DbNote.id == note_obj_id) # this is how you grab data from database by id
    if note_to_update == None:
        raise HTTPException(status_code=404, detail="Note not found") 
    note_to_update.text = note.text
    await note_to_update.save()
    return {"message" : "Note updated"}

@note_router.delete("/{note_id}")
async def delete_note(note_id: str) -> dict:
    # note_obj_id = ObjectId(note_id)
    note_to_delete = await DbNote.find_one(DbNote.id == ObjectId("66071f843c3ee5e92b472c90"))
    if note_to_delete is None:
        raise HTTPException(status_code=404, detail="Note not found")
    await note_to_delete.delete()
    return {"message" : "Note deleted"}