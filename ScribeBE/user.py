from fastapi import APIRouter, HTTPException
from models.user_model import DbUser, User

# for debugging purpose
import logging
logger = logging.getLogger(__name__)

user_router = APIRouter()


@user_router.post("/", status_code=201)
async def signup(user:User) -> dict:
    
    # Check if there are that email or name already exists in database
    existing_user = await DbUser.find_one({
            "$or": [
                {"email": user.email.lower()},
                {"name": user.name}
            ]
        })

    # logger.debug(f"Existing user found: {existing_user}")

    if existing_user:
        raise HTTPException(status_code=404, detail="Email or name already exists") 

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
        
