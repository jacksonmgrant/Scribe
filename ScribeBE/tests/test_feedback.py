import pytest
from bson.objectid import ObjectId
import httpx

from auth.JWT_token import create_access_token 

@pytest.fixture
async def access_token() -> str:
    return create_access_token(data={
                "sub": str(ObjectId('661efe6b374bc649942efd81')),
                "email_id": 'a@gmail.com',
                "password": "$2b$12$y6yvtbPyUXZmhej1cKD7hewcIGKWbV96sJIhSvjONpy4Q0sHMzVi2"
            })

@pytest.mark.anyio
async def test_recieve_feedback(access_token: str) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    payload = {
        "text" : "pytest",
        "rating" : 5
    }

    test_response = {"detail":"successfully add new feedback"}

    response = httpx.post("http://localhost:8000/feedback/",headers=headers,json=payload)

    assert response.status_code == 201
    assert response.json() == test_response

@pytest.mark.anyio
async def test_recieve_feedback_with_empty_text_review(access_token: str) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    payload = {
        "text" : "",
        "rating" : 2
    }

    test_response = {"detail":"Plz fill something"}

    response = httpx.post("http://localhost:8000/feedback/",headers=headers,json=payload)

    assert response.status_code == 400
    assert response.json() == test_response

@pytest.mark.anyio
async def test_recieve_feedback_with_empty_rating_review(access_token: str) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    payload = {
        "text" : "asd",
        "rating" : 0
    }

    test_response = {"detail":"Plz fill something"}

    response = httpx.post("http://localhost:8000/feedback/",headers=headers,json=payload)

    assert response.status_code == 400
    assert response.json() == test_response