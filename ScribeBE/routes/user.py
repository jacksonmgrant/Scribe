import logging
from auth.hash_password import HashPassword
import auth.JWT_token as JWT_token
from database.connection import Database
from fastapi import APIRouter, HTTPException, status  # type: ignore
from models.user_model import DbUser, User, Login, TokenResponse
from datetime import timedelta


user_router = APIRouter(tags=["User"])

user_database = Database(User)
hash_password = HashPassword()


@user_router.post("/signup", status_code=201)
async def signup(user: User) -> dict:
    # To check if name or email or password is blank
    if not user.name or not user.email or not user.password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="name or email or password can not be blank"
                            )

    existing_email = await DbUser.find_one(DbUser.email == user.email)
    if existing_email:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="A user with this email already exists."
                            )

    hashed_user_password = hash_password.create_hash(user.password)
    user.password = hashed_user_password
    await user_database.save(user)

    user_token = JWT_token.create_access_token(
        data={
            "sub": str(user.id),
            "email_id": user.email,
        },
        expires_delta=timedelta(minutes=JWT_token.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return {"msg": "successfully add new user",
            "access_token": user_token, "token_type": "Bearer"}


@user_router.post("/login", response_model=TokenResponse)
async def login(user: Login):
    existing_user = await DbUser.find_one(DbUser.email == user.email)

    # for case email is not correct
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password, or user does not exist."
        )

    check_password = hash_password.verify_hash(user.password,
                                               existing_user.password)

    if check_password:
        user_token = JWT_token.create_access_token(
            data={
                "sub": str(existing_user.id),
                "email_id": existing_user.email,
                "password": user.password
            },
            expires_delta=timedelta(
                minutes=JWT_token.ACCESS_TOKEN_EXPIRE_MINUTES
            )
        )
        return {"access_token": user_token, "token_type": "Bearer"}

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid details passed."
    )

    # for case password is not correct
    # raise HTTPException(
    #     status_code=status.HTTP_400_BAD_REQUEST,
    #     detail="Incorrect email or password, or user does not exist.")
