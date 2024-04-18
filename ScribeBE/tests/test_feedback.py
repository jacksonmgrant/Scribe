import pytest
from bson.objectid import ObjectId
from httpx import AsyncClient
from auth.JWT_token import create_access_token

@pytest.fixture
async def access_token() -> str:
    return create_access_token(data={
                "sub": str(ObjectId('661efe6b374bc649942efd81')),
                "email_id": 'a@gmail.com',
                "password": "$2b$12$y6yvtbPyUXZmhej1cKD7hewcIGKWbV96sJIhSvjONpy4Q0sHMzVi2"
            })

@pytest.mark.anyio
async def test_recieve_feedback(default_client: AsyncClient, access_token: str) -> None:
    Headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    Payload = {
        "text" : "good",
        "rating" : 3
    }

    test_response = {"detail":"successfully add new feedback"}

    response = await default_client.post("/feedback/",json=Payload,headers=Headers)

    assert response.status_code == 201
    assert response.json() == test_response