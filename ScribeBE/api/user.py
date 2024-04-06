from fastapi import APIRouter, HTTPException
from models.user_model import DbUser, User, Login
import string
import random
from ScribeBE.security.hash_password import HashPassword
import ScribeBE.security.JWT_token as JWT_token
from datetime import datetime, timedelta, timezone

hash_password = HashPassword()
user_router = APIRouter()


@user_router.post("/", status_code=201)
async def signup(user:User) -> dict:
    random_letter = random.choice(string.ascii_lowercase)
    hashed_user_password = hash_password.create_hash_with_salt(user.password ,random_letter * 21 + random_letter)
    existing_email = await DbUser.find_one(DbUser.email == user.email)

    if existing_email:
        raise HTTPException(status_code=404, detail="Someone already use this email.Please Use something else") 

    # To check if name or email or password is blank
    if not user.name or not user.email or not user.password:
        raise HTTPException(status_code=400, detail="name or email or password can not be blank")
    
    new_user =  DbUser(name=user.name,email=user.email,password=hashed_user_password)
    await new_user.insert()
    
    return {"msg": "successfully add new user"}

@user_router.post("/login", status_code=201)
async def login(user:Login):
    existing_user = await DbUser.find_one(DbUser.email == user.email)

    # email is not correct
    if not existing_user:
        raise HTTPException(status_code=400, detail="Email or password is not correct")
    
    check_password = hash_password.verify_hash(user.password,existing_user.password)
    
    if check_password:
        user_token = JWT_token.create_access_token(
        data={"email_id" : existing_user.email,
            "password" : user.password},
        expires_delta=timedelta(minutes=JWT_token.ACCESS_TOKEN_EXPIRE_MINUTES),
        )
    
    
        
    if existing_user and check_password:
       return {user_token}

    # password is not correct   
    raise HTTPException(status_code=400, detail="Email or password is not correct")



