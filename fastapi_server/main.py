from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.blog import get_blog_ai
from app.article import get_article_ai

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

class ArticleQuery(BaseModel):
    question: str

@app.post("/blog")
async def handle_query(query: Query):
    answer = get_blog_ai(query.query, query.category)
    return {"response": answer}

@app.post("/article")
async def handle_article_query(article_query: ArticleQuery):
    answer = get_article_ai(article_query.question)
    return {"response": answer}