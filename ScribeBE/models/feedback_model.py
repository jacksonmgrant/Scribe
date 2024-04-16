from beanie import Document  # type: ignore
from pydantic import BaseModel


class Feedback(BaseModel):
    text: str
    rating: int


class DbFeedback(Document):
    text: str
    rating: int

    class Settings:
        name = "feedbacks"
        keep_nulls = False
