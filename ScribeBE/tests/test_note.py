from datetime import datetime
from bson import ObjectId
from dotenv import load_dotenv
import httpx
import pytest

from database.connection import Settings
from models.note_model import DbNote
from auth.JWT_token import create_access_token
from database.database import Database

test_user_id = '662be2c6ef346c7484bf0c2a'
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
    await init_database
    new_note = DbNote(
        text="pytest note",
        user_id=test_user_id,
        time=datetime.now()
    )
    return new_note

@pytest.fixture
async def setupDatabase(init_database, mock_note):
    try:
        note = await mock_note
        note_database = Database(DbNote)
        await note_database.save(note)

        yield note_database

    finally:
        await note_database.delete_all_by_field("user_id", note.user_id)


#Get notes tests
@pytest.mark.asyncio
async def test_get_notes_as_user(access_token: str, setupDatabase) -> None:
    token = await access_token
    async for note_database in setupDatabase:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        print(await note_database.get_by_field("user_id", test_user_id))

        response = httpx.get("http://localhost:8000/notes/"+test_user_id, headers=headers)

        assert response.status_code == 200

        note_dict = response.json()["notes"]
        expected = True
        expected_id = test_user_id
        for note in note_dict:
            if note["user_id"] != expected_id:
                expected = False
                break
        assert expected == True


@pytest.mark.asyncio
async def test_get_notes_as_admin(admin_token: str, setupDatabase) -> None:
    token = await admin_token
    async for note_database in setupDatabase:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        expected_response = len(await note_database.get_all())

        response = httpx.get("http://localhost:8000/notes/"+admin_user_id, headers=headers)

        assert response.status_code == 200
        assert len(response.json()["notes"]) == expected_response

@pytest.mark.asyncio
async def test_get_notes_with_invalid_user_id(access_token: str) -> None:
    token = await access_token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    wrong_id = 'wrongid'
    response = httpx.get("http://localhost:8000/notes/"+wrong_id, headers=headers)

    assert response.status_code == 400


# Create note tests
@pytest.mark.asyncio
async def test_create_note(access_token: str) -> None:
    token = await access_token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    payload = {
        "id": test_user_id,
        "text" : "pytest create note"
    }

    expected_response = {"note created": "pytest create note"}

    response = httpx.post("http://localhost:8000/notes/", headers=headers, json=payload)

    assert response.status_code == 201
    assert response.json() == expected_response


@pytest.mark.asyncio
async def test_create_note_with_empty_text(access_token: str) -> None:
    token = await access_token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    payload = {
        "id": test_user_id,
        "text" : None
    }

    expected_response = {"detail": "Note must have text"}

    response = httpx.post("http://localhost:8000/notes/", headers=headers, json=payload)

    assert response.status_code == 400
    assert response.json() == expected_response


#Update note tests
@pytest.mark.asyncio
async def test_update_note(access_token: str, mock_note: DbNote, setupDatabase) -> None:
    token = await access_token
    async for note_database in setupDatabase:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        note_id = str((await note_database.get_by_field("user_id", test_user_id))[0].id)

        payload = {
            "id": note_id,
            "text" : "pytest note updated"
        }

        expected_response = {"message": "Note updated"}

        response = httpx.put("http://localhost:8000/notes/", headers=headers, json=payload)
        
        assert response.status_code == 200
        assert response.json() == expected_response

@pytest.mark.asyncio
async def test_update_note_as_wrong_user(access_token: str) -> None:
    token = await access_token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    # If this test is failing the note with this id probably got deleted. Make a new one and paste the id here.
    wrong_id = '662713c5232c69e8241749e5'
    payload = {
        "id": wrong_id,
        "text" : "This note will be accessed by the wrong user"
    }

    expected_response = {"detail": "Operation not allowed"}

    response = httpx.put("http://localhost:8000/notes/", headers=headers, json=payload)

    assert response.status_code == 400
    assert response.json() == expected_response

@pytest.mark.asyncio
async def test_update_note_with_invalid_note_id(access_token: str) -> None:
    token = await access_token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    payload = {
        "id": "wrong_id",
        "text" : "This note does not exist"
    }

    expected_response = {"detail": "Note not found"}

    response = httpx.put("http://localhost:8000/notes/", headers=headers, json=payload)

    assert response.status_code == 404
    assert response.json() == expected_response

@pytest.mark.asyncio
async def test_update_note_with_nonexistent_note_id(access_token: str) -> None:
    token = await access_token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    payload = {
        "id": "66105db717133f8a7b0952dc",
        "text" : "This note does not exist"
    }

    expected_response = {"detail": "Note not found"}

    response = httpx.put("http://localhost:8000/notes/", headers=headers, json=payload)

    assert response.status_code == 404
    assert response.json() == expected_response

#Delete note tests
@pytest.mark.asyncio
async def test_delete_note(access_token: str, mock_note: DbNote, setupDatabase) -> None:
    token = await access_token
    async for note_database in setupDatabase:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        note_id = str((await note_database.get_by_field("user_id", test_user_id))[0].id)

        response = httpx.delete("http://localhost:8000/notes/"+note_id, headers=headers)

        expected_response = {"message": "Note deleted successfully"}
        
        assert response.status_code == 200
        assert response.json() == expected_response

@pytest.mark.asyncio
async def test_delete_note_with_nonexistent_id(access_token: str) -> None:
    token = await access_token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    expected_response = {"detail": "Note not found"}

    wrong_id = "66105db717133f8a7b0952dc"
    response = httpx.delete("http://localhost:8000/notes/"+wrong_id, headers=headers)
    
    assert response.status_code == 404
    assert response.json() == expected_response

@pytest.mark.asyncio
async def test_delete_note_with_invalid_user_id(access_token: str) -> None:
    token = await access_token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    wrong_id = "not-an-id"
    response = httpx.delete("http://localhost:8000/notes/"+wrong_id, headers=headers)
    
    assert response.status_code == 422
