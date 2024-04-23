from datetime import datetime
from bson import ObjectId
from dotenv import load_dotenv
import httpx
import pytest

from database.connection import Settings
from models.note_model import DbNote
from auth.JWT_token import create_access_token
from database.database import Database

test_user_id = '66253cbf8765b34b68bfe638'
admin_user_id = '66105db717133f8a7b0952dc'



@pytest.fixture
async def init_database():
    load_dotenv()
    db_settings = Settings()
    await db_settings.initialize_database()


@pytest.fixture
async def access_token() -> str:
    return create_access_token(data={
                "sub": str(ObjectId(test_user_id)),
                "email_id": 'pytest@email.com',
                "password": "$2b$12$5JY3bnlMRTOm3rFl9g/ShOCkww0RHVwUdWXKRuilxSCfVTluX2pJW"
            })

@pytest.fixture
async def admin_token() -> str:
    return create_access_token(data={
                "sub": str(ObjectId(admin_user_id)),
                "email_id": "admin@admin.com",
                "password": "$2b$12$dddddddddddddddddddddO7zUqF4Ok5bSWktYrX9eN99YyB6AOoTu"
        })

@pytest.fixture
async def mock_note(init_database):
    new_note = DbNote(
        text="pytest note",
        user_id=test_user_id
    )
    return new_note

@pytest.fixture
async def setupDatabase(init_database, mock_note):
    note_database = Database(DbNote)
    await note_database.save(mock_note)

    yield

    await note_database.delete_all_by_field("user_id", mock_note.user_id)


# Create note tests
@pytest.mark.anyio
async def test_create_note(access_token: str) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    payload = {
        "id": test_user_id,
        "text" : "pytest create note"
    }

    expected_response = {"note created": "pytest create note"}

    response = httpx.post("http://localhost:8000/notes/", headers=headers, json=payload)

    assert response.status_code == 201
    assert response.json() == expected_response


@pytest.mark.anyio
async def test_create_note_with_empty_text(access_token: str) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    payload = {
        "id": test_user_id,
        "text" : None
    }

    expected_response = {"detail": "Note must have text"}

    response = httpx.post("http://localhost:8000/notes/", headers=headers, json=payload)

    assert response.status_code == 400
    assert response.json() == expected_response


#Get notes tests
@pytest.mark.anyio
async def test_get_notes_as_user(access_token: str, mock_note: DbNote, setupDatabase) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    expected_response = {"notes": [mock_note.model_dump()]}

    response = httpx.get("http://localhost:8000/notes/"+test_user_id, headers=headers)

    assert response.status_code == 200
    assert response.json() == expected_response


@pytest.mark.anyio
async def test_get_notes_as_admin(admin_token: str, mock_note: DbNote, setupDatabase) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {admin_token}"
    }

    note_database = Database(DbNote)
    expected_response = len(await note_database.get_all())

    response = httpx.get("http://localhost:8000/notes/"+admin_user_id, headers=headers)

    assert response.status_code == 200
    assert len(response.json().notes) == expected_response


@pytest.mark.anyio
async def test_get_notes_with_invalid_user_id(access_token: str, mock_note: DbNote, setupDatabase) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    expected_response = {"notes": [mock_note.model_dump()]}

    wrong_id = '66119545e3baf3d485e8fda6'
    response = httpx.get("http://localhost:8000/notes/"+wrong_id, headers=headers)

    assert response.status_code == 200
    assert response.json() == expected_response


#Update note tests
@pytest.mark.anyio
async def test_update_note(access_token: str, mock_note: DbNote, setupDatabase) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    payload = {
        "id": test_user_id,
        "text" : "pytest note updated"
    }

    expected_response = {"message": "Note updated"}

    response = httpx.put("http://localhost:8000/notes/", headers=headers, json=payload)
    
    print(response.json())
    assert response.status_code == 201
    assert response.json() == expected_response

@pytest.mark.anyio
async def test_update_note_with_invalid_id(access_token: str, setupDatabase) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    wrong_id = '66119545e3baf3d485e8fda6'
    payload = {
        "id": wrong_id,
        "text" : "pytest note updated"
    }

    expected_response = {"detail": "Operation not allowed"}

    response = httpx.put("http://localhost:8000/notes/", headers=headers, json=payload)

    assert response.status_code == 400
    assert response.json() == expected_response

@pytest.mark.anyio
async def test_update_note_with_invalid_user_id(access_token: str, setupDatabase) -> None:
    pass

#Delete note tests
@pytest.mark.anyio
async def test_delete_note(access_token: str, mock_note: DbNote, setupDatabase) -> None:
    pass

@pytest.mark.anyio
async def test_delete_note_with_invalid_id(access_token: str, setupDatabase) -> None:
    pass

@pytest.mark.anyio
async def test_delete_note_with_invalid_user_id(access_token: str, setupDatabase) -> None:
    pass
