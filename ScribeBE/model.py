from pydantic import BaseModel

class Note(BaseModel):
    id: int
    text: str | None