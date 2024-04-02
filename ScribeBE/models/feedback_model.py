from beanie import Document
from pydantic import BaseModel

class Feedback(BaseModel):
    id: int
    text: str
    rating: int

class DbFeedback(Document):
    text: str
    rating: int
    
    class Settings:
        name = "feedback"
        keep_nulls = False