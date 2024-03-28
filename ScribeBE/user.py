from fastapi import APIRouter, HTTPException


user_router = APIRouter()

"""
I still need to setup mongoDB first, but this backend server should work

    ***instantiate  database object from mongoDB***
    database = I don't know about syntax

**** signup   idea: we need to push our clinet's info to database*****
@user_router.post("/SignupPage", status_code=201)
async def create_user(name:str, email_id:str, password:str) -> str:
    database.append({
        "Name" : name,
        "Email_id" : email_id,
        "Password" : password
    })
    return("successfuly signup")

**** login    idea: we need to check that what user log-in is matching what we have in database *****

@user_router.post("/loginSignupPage")
async def login(email_id:str, password:str) -> str:
    
    check = {
        "Email_id" : email_id,
        "Password" : password
    }
    
    for user in database:
        if user == check:
            return ("successfuly login")
    raise HTTPException(status_code=404, detail="wrong Username or password")
        
"""