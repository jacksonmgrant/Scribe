from datetime import datetime
from typing import Optional
import pymongo
from beanie import Document, Indexed, init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

class Note(Document):
    text: str
    time: datetime = datetime.now()
    hasRecording: Optional[bool] = False

    class Settings:
        name = "notes"
        indexes = [("time", pymongo.DESCENDING)]

async def init_db():
    # Do not push password!
    client = AsyncIOMotorClient("connection-string-here")
    await init_beanie(client.ScribeDB, document_models=[Note])

