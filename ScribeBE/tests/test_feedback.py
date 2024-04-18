import pytest
from auth.JWT_token import create_access_token
from bson.objectid import ObjectId
from httpx import AsyncClient
from routes.feedback import recieve_feedback

@pytest.fixture
async def access_token() -> str:
    return create_access_token(data={
                "sub": str(ObjectId('661efe6b374bc649942efd81')),
                "email_id": 'a@gmail.com',
                "password": "$2b$12$y6yvtbPyUXZmhej1cKD7hewcIGKWbV96sJIhSvjONpy4Q0sHMzVi2"
            })