from typing import Optional
from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    name: str
    email: EmailStr
    password: str

class DbUser(Document):
    name: str
    email: EmailStr
    password: str
    
    class Settings:
        name = "users"
