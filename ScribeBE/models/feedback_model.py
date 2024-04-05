from beanie import Document
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