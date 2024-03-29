import os
from beanie import init_beanie
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

from models.note_model import DbNote
from models.user_model import DbUser
async def init_db():
    # reads the environment variables from the .env file.
    load_dotenv()

    # connect to your mongodb database. Please change to your database
    client = AsyncIOMotorClient(f"mongodb+srv://{os.getenv("DB_USER")}:{os.getenv("DB_PASS")}@scribedb.klymspw.mongodb.net/")

    # selecting collections
    await init_beanie(client.ScribeDB, document_models=[DbNote], document_models=[DbUser])
