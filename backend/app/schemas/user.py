from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    imageUrl: str
    imageUrlId: Optional[str]
    password: str
    timeStamp: Optional[datetime] = None


class UserResponse(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: EmailStr
    imageUrl: str
    imageUrlId: Optional[str]
    timeStamp: Optional[datetime] = None


class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str