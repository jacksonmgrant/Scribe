from beanie import Document
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    name: str
    email: EmailStr
    password: str

class Login(BaseModel):
    email: EmailStr
    password: str

class DbUser(Document):
    name: str
    email: EmailStr
    password: str
    role: str | None = "user"
    
    class Settings:
        name = "users"
        keep_nulls = False
