from fastapi import APIRouter, HTTPException
from models.user_model import DbUser, User
from pydantic import EmailStr



user_router = APIRouter()


@user_router.post("/", status_code=201)
async def signup(user:User) -> dict:
    
    all_dbuser = await DbUser.find().to_list()
    if all_dbuser:
        for dbuser in all_dbuser :
            if user.name == dbuser.name or user.email == dbuser.email:
                raise HTTPException(status_code=400, detail="Sorry someone already use this email & name")
            
    if user.name == "" or user.email == "" or user.password == "":
        raise HTTPException(status_code=400, detail="name or email or password can not be blank")
    
    new_user =  DbUser(name=user.name,email=user.email,password=user.password)
    await new_user.insert()
    
    return {"msg": "successfully add new user"}



# @user_router.post("/loginSignup")
# async def login(email_id:str, password:str) -> str:
    
#     check = {
#         "Email_id" : email_id,
#         "Password" : password
#     }
    
#     for user in database:
#         if user == check:
#             return ("successfuly login")
#     raise HTTPException(status_code=404, detail="wrong Username or password")
        
