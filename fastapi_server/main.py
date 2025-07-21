from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.blog import get_blog_ai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    query: str
    category: str

@app.post("/blog")
async def handle_query(query: Query):
    answer = get_blog_ai(query.query, query.category)
    return {"response": answer}