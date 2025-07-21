from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

def get_blog_ai(question: str, category: str) -> str:
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=os.getenv("GOOGLE_API_KEY_BLOG")
    )

    message = [
        SystemMessage(
            content=(
                f"You are a helpful AI assistant specialized in writing blog articles about **{category}**. "
                f"If the user's question is unrelated to **{category}**, respond with:\n\n"
                f"I'm sorry, I can only provide blog content related to **{category}**. "
                f"The question \"{question}\" is not relevant to this topic.\n\n"
                f"If the question is relevant, write a high-quality blog post of approximately **500 words**. "
                f"Make the article informative, engaging, and suitable for a general audience."
            )
        ),
        HumanMessage(content=question)
    ]

    response = llm.invoke(message)
    return response.content
