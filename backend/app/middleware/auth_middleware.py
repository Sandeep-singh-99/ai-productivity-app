from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from app.dependencies.auth import get_current_user

async def auth_middleware(request: Request, call_next):
    public_routes = ["/auth/login", "/auth/refresh", "/auth/register"]
    if request.url.path in public_routes:
        return await call_next(request)
    
    try:
        user = await get_current_user(request)
        request.state.user = user
        return await call_next(request)
    except HTTPException:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Not authenticated"}
        )