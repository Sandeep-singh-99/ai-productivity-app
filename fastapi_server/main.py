from fastapi import FastAPI, Form
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.blog import get_blog_ai
from app.article import get_article_ai
from app.imageGenerate import generate_image_bytes

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


@app.post("/generate-image")
async def generate_image(context: str = Form(...), style: str = Form(...)):
    print(f"➡️ Received image prompt: {context} | style: {style}")
    image_stream = generate_image_bytes(context, style)
    
    if image_stream:
        return StreamingResponse(image_stream, media_type="image/png")
    
    return {"error": "Image not generated or an error occurred"}
