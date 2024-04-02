from fastapi import APIRouter, HTTPException
from models.feedback_model import Feedback, DbFeedback
from bson.objectid import ObjectId

# This will be replaced with a database
feedback_list: list[Feedback] = []
current_id = 0


feedback_router = APIRouter()


@feedback_router.get("/")
async def get_feedback() -> dict:
    feedback = await DbFeedback.find().to_list()
    return {"feedback": feedback}

@feedback_router.get("/{feedback_id}")
async def get_feedback(feedback_id: int) -> dict:
    for feedback in feedback_list:
        if feedback.id == feedback_id:
            return {"feedback" : feedback}
    raise HTTPException(status_code=404, detail="Feedback not found")

### Kate : Need to create rating too
############################################
@feedback_router.post("/", status_code=201)
#idk if this is the correct way to create multiple fields
async def create_feedback(feedback: DbFeedback) -> dict:
    if feedback.text is None or 'text' not in feedback.text:
        raise HTTPException(status_code=400, detail="Feedback must have text")
    if feedback.rating is None or 'rating' not in feedback.rating:
        raise HTTPException(status_code=400, detail="Feedback must have rating")
    new_feedback = DbFeedback(text=feedback.text, rating=feedback.rating)
    # Insertion not working
    await new_feedback.insert()
    return {"feedback" : feedback}

### Nithi : in mongodb id datatype is objectId which is not int. look at mongodb compass ###
###################################################################
@feedback_router.put("/{feedback_id}")
async def update_feedback(feedback_id: str, feedback: Feedback) -> dict:
    feedback_obj_id = ObjectId(feedback_id)
    feedback_to_update = await DbFeedback.find_one(DbFeedback.id == feedback_obj_id) # this is how you grab data from database by id
    if feedback_to_update == None:
        raise HTTPException(status_code=404, detail="Feedback not found") 
    feedback_to_update.text = feedback.text
    feedback_to_update.rating = feedback.rating
    await feedback_to_update.save()
    return {"message" : "Feedback updated"}

@feedback_router.delete("/{feedback_id}")
async def delete_note(feedback_id: str) -> dict:
    # note_obj_id = ObjectId(note_id)
    feedback_to_delete = await DbFeedback.find_one(DbFeedback.id == ObjectId("66071f843c3ee5e92b472c90"))
    if feedback_to_delete is None:
        raise HTTPException(status_code=404, detail="Feedback not found")
    await feedback_to_delete.delete()
    return {"message" : "Feedback deleted"}