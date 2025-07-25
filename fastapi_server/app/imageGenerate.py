from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
import base64
import os
from dotenv import load_dotenv

# Load API key and configure Gemini
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY_IMAGE_GENERATE")

client = genai.Client(api_key=api_key)

def generate_image_bytes(context: str, style: str) -> BytesIO or None:
    try:
        prompt = f"{context}, in style of {style}"

        response = client.models.generate_content(
            model="gemini-2.0-flash-preview-image-generation",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"]
            )
        )

        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                img_bytes = BytesIO(part.inline_data.data)
                img_bytes.seek(0)
                return img_bytes
            elif part.text is not None:
                print("📝 Gemini text response:", part.text)

        print("❌ No image returned from Gemini.")
        return None

    except Exception as e:
        print("❌ Exception in Gemini image generation:", str(e))
        return None
