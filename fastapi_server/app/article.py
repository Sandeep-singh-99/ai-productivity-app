from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

def get_article_ai(question: str) -> str:
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=os.getenv("GOOGLE_API_KEY_ARTICLE")
    )

    message = [
        SystemMessage(content="You are a helpful assistant that generates articles. If user asks anything other than article generation, respond with 'I can only generate articles.' you only generate article based on the question provided. the length of the article should be 200 words."),
        HumanMessage(content=question)
    ]
    
    response = llm.invoke(message)
    return response.content