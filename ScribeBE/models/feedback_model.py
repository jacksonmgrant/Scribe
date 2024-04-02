from beanie import Document
from pydantic import BaseModel

class Feedback(BaseModel):
    id: int
    feedback: str
    rating: int

class DbFeedback(Document):
    id: int
    feedback: str
    rating: int
    
    class Settings:
        name = "feedback"
        keep_nulls = False