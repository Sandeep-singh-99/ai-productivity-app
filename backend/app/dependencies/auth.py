from fastapi import Depends, HTTPException, status, Request
from app.utils.auth import decode_token
from app.config.database import get_db
from app.models.user import User

async def get_current_user(request: Request, db=Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token = request.headers.get("access_token")
    if not token:
        raise credentials_exception
    
    payload = decode_token(token)
    if payload is None:
        raise credentials_exception
    
    username: str = payload.get("sub")
    if username is None:
        raise credentials_exception
    
    user = db.users.find_one({"firstName": username})
    if user is None or user.get("disabled", False):
        raise credentials_exception
    
    return User(**user)
