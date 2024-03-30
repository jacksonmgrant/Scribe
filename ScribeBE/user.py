from fastapi import APIRouter, HTTPException
from models.user_model import DbUser, User
from pydantic import EmailStr



user_router = APIRouter()


@user_router.post("/", status_code=201)
async def signup(user:User) -> dict:
    
    # Check if there are any users with the same name or email.
    existing_user = await DbUser.find_one({"$or": [{"name": user.name}, {"email": user.email}]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Sorry, someone already uses this email or name. Plz try a new one")


    # To check if name or email or password is blank
    if not user.name or not user.email or not user.password:
        raise HTTPException(status_code=400, detail="name or email or password can not be blank")
    
    new_user =  DbUser(name=user.name,email=user.email,password=user.password)
    await new_user.insert()
    
    return {"msg": "successfully add new user"}

@user_router.post("/login", status_code=201)
async def login(user:User) -> dict:

    existing_user = await DbUser.find_one({"$and": [{"password": user.password}, {"email": user.email}]})
    if existing_user:
       return {"msg": "welcome back"}
    else :
       raise HTTPException(status_code=400, detail="Email or password is not correct")
        
