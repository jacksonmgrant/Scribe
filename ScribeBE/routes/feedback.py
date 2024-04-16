from fastapi import APIRouter, HTTPException  # type: ignore
from database.connection import Database
from models.feedback_model import Feedback, DbFeedback


feedback_router = APIRouter(tags=["Feedback"])

feedback_database = Database(Feedback)


@feedback_router.post("/", status_code=201)
async def recieve_feedback(feedback: Feedback) -> dict | str:
    if not feedback.text or not feedback.rating:
        raise HTTPException(status_code=400, detail="Plz fill something")
    new_feedback = DbFeedback(text=feedback.text, rating=feedback.rating)
    await feedback_database.save(new_feedback)
    return {"detail": "successfully add new feedback"}
