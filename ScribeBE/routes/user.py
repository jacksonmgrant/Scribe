import logging
from auth.hash_password import HashPassword
import auth.JWT_token as JWT_token
from database.connection import Database
from fastapi import APIRouter, HTTPException, status  # type: ignore
from models.user_model import DbUser, User, Login, TokenResponse
from datetime import timedelta

logger = logging.getLogger(__name__)

user_router = APIRouter(tags=["User"])

user_database = Database(User)
hash_password = HashPassword()


@user_router.post("/signup", status_code=201)
async def signup(user: User) -> dict:
    logger.info(f"User {user.email} is signing up.")
    # To check if name or email or password is blank
    if not user.name or not user.email or not user.password:
        logger.warning("Form fields cannot be blank")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="name or email or password can not be blank"
                            )

    existing_email = await DbUser.find_one(DbUser.email == user.email)
    if existing_email:
        logger.warning(f"User {user.email} has already signed up.")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="A user with this email already exists."
                            )

    hashed_user_password = hash_password.create_hash(user.password)
    new_user = DbUser(name=user.name, email=user.email,
                      password=hashed_user_password)
    await user_database.save(new_user)

    user_token = JWT_token.create_access_token(
        data={
            "sub": str(new_user.id),
            "email_id": new_user.email,
        },
        expires_delta=timedelta(minutes=JWT_token.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    logger.info(f"User {user.email} signed up.")
    return {"msg": "successfully add new user",
            "access_token": user_token, "token_type": "Bearer"}


@user_router.post("/login", response_model=TokenResponse)
async def login(user: Login):
    logger.info(f"User {user.email} is signing into the system.")
    existing_user = await DbUser.find_one(DbUser.email == user.email)

    # for case email is not correct
    if not existing_user:
        logger.warning(f"User {user.email} not found.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password, or user does not exist."
        )

    check_password = hash_password.verify_hash(user.password,
                                               existing_user.password)

    if check_password:
        logger.info(f"User {user.email} signed in.")
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
    logger.info("Invalid details passed.")
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid details passed."
    )

    # for case password is not correct
    # raise HTTPException(
    #     status_code=status.HTTP_400_BAD_REQUEST,
    #     detail="Incorrect email or password, or user does not exist.")
