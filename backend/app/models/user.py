from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    imageUrl: str
    imageUrlId: Optional[str]
    password: str
    timeStamp: Optional[datetime] = None