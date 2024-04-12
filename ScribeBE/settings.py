from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DB_USER: str = Field(default="")
    DB_PASS: str = Field(default="")
    SECRET_KEY: str = Field(default="")

    model_config = SettingsConfigDict(env_file=".env")
