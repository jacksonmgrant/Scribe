from beanie import Document  # type: ignore
from pydantic import BaseModel, EmailStr


class User(BaseModel):
    name: str
    email: EmailStr | str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class Login(BaseModel):
    email: EmailStr | str
    password: str


class DbUser(Document):
    name: str
    email: EmailStr
    password: str
    role: str | None = "user"

    class Settings:
        name = "users"
        keep_nulls = False
