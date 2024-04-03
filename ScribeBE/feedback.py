from fastapi import APIRouter, HTTPException
from models.feedback_model import Feedback, DbFeedback

feedback_router = APIRouter()

@feedback_router.post("/", status_code=201)
async def recieve_feedback(feedback:Feedback)-> dict:
    new_feedback = DbFeedback(text=feedback.text,rating=feedback.rating)
    await new_feedback.insert()
    return {"msg": "successfully add new feedback"} 