import os
from beanie import init_beanie
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

from models.note_model import DbNote

async def init_db():
    load_dotenv()
    client = AsyncIOMotorClient(f"mongodb+srv://{os.getenv("DB_USER")}:{os.getenv("DB_PASS")}@scribedb.klymspw.mongodb.net/")
    await init_beanie(client.ScribeDB, document_models=[DbNote])
