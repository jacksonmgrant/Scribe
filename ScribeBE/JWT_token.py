from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from pydantic import EmailStr

SECRET_KEY = "a2ddad598b891e78cbbc00c4d53c8346a58c29f6a1dd4b4ce05c13b999a0c3e1"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token:
    access_token: str
    token_type: str


class TokenPayload:
    def __init__(self, email_id: EmailStr | str | None, password: str | None, exp: int | None) -> None:
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
        email: str = payload.get("email_id")
        password: str = payload.get("password")
        exp: int = payload.get("exp")
        return TokenPayload(email,password, exp)
    except JWTError:
        print("invalid JWT token")



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

