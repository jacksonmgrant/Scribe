from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status
from jose import JWTError, jwt
from pydantic import EmailStr
from settings import Settings

SECRET_KEY = "a2ddad598b891e78cbbc00c4d53c8346a58c29f6a1dd4b4ce05c13b999a0c3e1"
# SECRET_KEY = Settings().SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token:
    access_token: str
    token_type: str


class TokenPayload:
    def __init__(self, id: str | None, email_id: EmailStr | str | None, password: str | None, exp: int | None) -> None:
        self.id = id
        self.email_id = email_id
        self.password = password
        self.exp = exp
        self.exp_datetime = datetime.fromtimestamp(exp)

    def __str__(self) -> str:
        return f"user=[]"


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=60)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_jwt_token(token: str) -> TokenPayload | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("sub")
        email: str = payload.get("email_id")
        password: str = payload.get("password")
        exp: int = payload.get("exp")
        return TokenPayload(id, email,password, exp)
    except JWTError:
        print("invalid JWT token")

def verify_access_token(token: str):
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        expire = data.get("expires")

        if expire is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No access token supplied",
            )
        if datetime.now() > datetime.fromtimestamp(expire):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Token expired!"
            )
        return data

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token"
        )



### test purpose
# my_token = create_access_token(
#     data={"email_id" : "ford@gmail.com",
#           "password" : "ford123"},
#     expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
# )

# print(my_token)

# payload = decode_jwt_token(my_token)
# print(payload)
# print(payload.email_id)
# print(payload.password)
# print(payload.exp_datetime)

