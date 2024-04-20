import logging
from database.database import Database
from fastapi import APIRouter, Depends, HTTPException  # type: ignore
from auth.authenticate import authenticate
from models.feedback_model import Feedback, DbFeedback

logger = logging.getLogger(__name__)

feedback_router = APIRouter(tags=["Feedback"])

feedback_database = Database(Feedback)


@feedback_router.post("/", status_code=201)
async def recieve_feedback(feedback: Feedback, user: str = Depends(authenticate)) -> dict | str:
    if not feedback.text or not feedback.rating:
        logger.warning("Fields cannot be blank")
        raise HTTPException(status_code=400, detail="Plz fill something")
    new_feedback = DbFeedback(text=feedback.text, rating=feedback.rating)
    await feedback_database.save(new_feedback)
    logger.info(f"New feedback from {user["email_id"]} created")
    return {"detail": "successfully add new feedback"}
