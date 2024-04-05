from fastapi import APIRouter, HTTPException
from models.user_model import DbUser, User, Login
import string
import random
from hash_password import HashPassword


hash_password = HashPassword()
user_router = APIRouter()


@user_router.post("/", status_code=201)
async def signup(user:User) -> dict:
    random_letter = random.choice(string.ascii_lowercase)
    hashed_user_password = hash_password.create_hash_with_salt(user.password ,random_letter * 21 + random_letter)
    existing_user = await DbUser.find_one({
            "$or": [
                {"email": user.email.lower()},
                {"name": user.name.lower()}
            ]
        })

    
    if existing_user:
        raise HTTPException(status_code=404, detail={"msg": "Someone already use this email.Please Use something else"}) 

    # To check if name or email or password is blank
    if not user.name or not user.email or not user.password:
        raise HTTPException(status_code=400, detail={"msg": "name or email or password can not be blank"})
    
    new_user =  DbUser(name=user.name,email=user.email,password=hashed_user_password,role="user")
    await new_user.insert()
    
    return {"msg": "successfully add new user"}

@user_router.post("/login", status_code=201)
async def login(user:Login) -> dict:
    existing_user = await DbUser.find_one(DbUser.email == user.email)
    check_password = hash_password.verify_hash(user.password,existing_user.password)
    if existing_user and check_password:
       return {"msg": "welcome back"}
    else:
       raise HTTPException(status_code=400, detail="Email or password is not correct")
        
# email:User.email, password:User.password