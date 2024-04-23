from beanie import init_beanie  # type: ignore
from pydantic_settings import BaseSettings, SettingsConfigDict
from models.feedback_model import DbFeedback
from models.note_model import DbNote
from models.user_model import DbUser
from models.audio_model import DbAudio
from motor.motor_asyncio import AsyncIOMotorClient  # type: ignore
from pydantic import Field


class Settings(BaseSettings):
    DB_USER: str = Field(default="")
    DB_PASS: str = Field(default="")
    SECRET_KEY: str = Field(default="")

    model_config = SettingsConfigDict(env_file=".env")

    async def initialize_database(self):
        DATABASE_URL: str = f"mongodb+srv://{self.DB_USER}:{self.DB_PASS}@scribedb.klymspw.mongodb.net/"
        client = AsyncIOMotorClient(DATABASE_URL)
        await init_beanie(
            database=client.ScribeDB,
            document_models=[DbFeedback, DbNote, DbUser, DbAudio]
        )
