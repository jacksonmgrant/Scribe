from bson import ObjectId
from dotenv import load_dotenv
from fastapi import UploadFile
import httpx
import pytest

from database.connection import Settings
from auth.JWT_token import create_access_token
from database.database import Database
from models.audio_model import DbAudio


test_user_id = '66304cdcdd39bb070119e510'

@pytest.fixture
async def access_token() -> str:
    return create_access_token(data={
                "sub": str(ObjectId(test_user_id)),
                "email_id": 'notetester@email.com',
                "password": "$2b$12$UrZEgTIbtDEah7lROiY/wOW8o.6rncpOgSqOrBju2RuNsOC5l/mju"
            })

@pytest.fixture
async def init_database():
    load_dotenv()
    db_settings = Settings()
    await db_settings.initialize_database()

@pytest.fixture
async def inject_audio(access_token):
    token = await access_token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    file_path = "tests/resources/Conference.wav"
    audio_file = UploadFile(file_path)

    payload = {
        "audio": audio_file
    }

    response = httpx.post("http://localhost:8000/audio/", headers=headers, json=payload)

    return response.json()["recording_id"]

@pytest.mark.asyncio
async def test_receive_audio(access_token):
    token = await access_token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    file_path = "tests/resources/Conference.wav"
    audio_file = open(file_path, "rb")

    files = {"audio": ("file", audio_file)}


    response = httpx.post("http://localhost:8000/audio/", headers=headers, files=files)

    # Close the file after adding it to the request payload
    audio_file.close()

    assert response.status_code == 201
    assert bool(response.json()["recording_id"]) == True   # Check that the recording id exists


@pytest.mark.asyncio
async def test_get_audio_file(access_token, inject_audio):
    recording_id = await inject_audio
    headers = {
        "Content-Type": "application",
        "Authorization": f"Bearer {access_token}"
    }

    response = httpx.get("http://localhost:8000/audio/"+recording_id, headers=headers)

    assert response.status_code == 200
    assert bool(response.json()["audio_data"]) == True   # Check that the audio file is returned
