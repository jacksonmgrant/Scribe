from beanie import Document  # type: ignore

class DbAudio(Document):
    file: dict 

    class Settings:
        name = "audio"
        keep_nulls = False
