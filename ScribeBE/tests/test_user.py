from httpx import ASGITransport, AsyncClient
import pytest
from database.connection import Settings, Database
from main import app
import auth.JWT_token as JWT_token
from datetime import timedelta
from auth.hash_password import HashPassword
from auth.JWT_token import create_access_token
from bson.objectid import ObjectId
from models.user_model import DbUser, User
import jwt

user_database = Database(User)
hash_passowrd = HashPassword()

async def init_db():
    settings = Settings()
    await settings.initialize_database()

# @pytest.fixture
# async def access_token() -> str:
#     hashed_user_password = hash_passowrd.create_hash("pytest123")
#     new_user = DbUser(name="pytest", email="pytest@gmail.com",
#                       password=hashed_user_password)
#     await user_database.save(new_user)
#     return create_access_token(data={
#                 "sub": str(ObjectId(new_user.id)),
#                 "email_id": new_user.email,
#                 "password": new_user.password
#             })
           
@pytest.fixture
async def access_token() -> str:
    return create_access_token(data={
                "sub": str(ObjectId('661efe6b374bc649942efd81')),
                "email_id": 'a@gmail.com',
                "password": "a123"
            },
            expires_delta=timedelta(
                minutes=JWT_token.ACCESS_TOKEN_EXPIRE_MINUTES 
            ))

# @pytest.mark.anyio
# async def test_signup(access_token: str) -> None:

#     await init_db()

#     payload = {"name" : "pytest", "email": "pytest@gmail.com", "password": "pytest123"}
#     headers = {"Content-Type": "application/json"}
#     test_response = {'access_token': f'{access_token}', 'token_type': 'Bearer'}
    
#     async with AsyncClient(
#         transport=ASGITransport(app=app), base_url="http://localhost:3000"
#     ) as client:
#         response = await client.post("/users/signup", json=payload, headers=headers)

#     assert response.status_code == 201
#     assert response.json() == test_response

@pytest.mark.anyio
async def test_login_with_exist_user(access_token: str) -> None:

    await init_db()

    payload = {"name" : "a", "email": "a@gmail.com", "password": "a123"}
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    test_response = jwt.decode(access_token, "a2ddad598b891e78cbbc00c4d53c8346a58c29f6a1dd4b4ce05c13b999a0c3e1", algorithms=["HS256"])
    test_response_email_id = test_response["email_id"]
    test_response_passowrd = test_response["password"]
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://localhost:3000"
    ) as client:
        response = await client.post("/users/login", json=payload, headers=headers)

    JWT_token_response = response.json()["access_token"]
    decode_JWT_token_response = jwt.decode(JWT_token_response, "a2ddad598b891e78cbbc00c4d53c8346a58c29f6a1dd4b4ce05c13b999a0c3e1", algorithms=["HS256"])
    JWT_token_response_email_id = decode_JWT_token_response["email_id"]
    JWT_token_response_password = decode_JWT_token_response["password"]

    assert response.status_code == 200
    assert JWT_token_response_email_id == test_response_email_id
    assert JWT_token_response_password == test_response_passowrd