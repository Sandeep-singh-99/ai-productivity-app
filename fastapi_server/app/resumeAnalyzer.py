from langchain_google_genai import ChatGoogleGenerativeAI
import pdfplumber
import pytesseract
from PIL import Image
import tempfile
import os
from dotenv import load_dotenv
import re
import fitz  

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY_REVIEW_RESUME")



def extract_text_with_pdfplumber(pdf_path):
    """Extract text from PDF using pdfplumber, with OCR fallback."""
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                # Try direct text extraction
                page_text = page.extract_text() or ""
                text += page_text + "\n"
                # If no text, use OCR
                if not page_text.strip():
                    try:
                        img = page.to_image(resolution=300).original  # Higher resolution for better OCR
                        text += pytesseract.image_to_string(img) + "\n"
                    except Exception as e:
                        print(f"OCR failed for page: {str(e)}")
        return text.strip()
    except Exception as e:
        print(f"pdfplumber failed: {str(e)}")
        return ""

def extract_text_with_pymupdf(pdf_path):
    """Fallback extraction using PyMuPDF."""
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text() + "\n"
        doc.close()
        return text.strip()
    except Exception as e:
        print(f"PyMuPDF failed: {str(e)}")
        return ""

async def analyze_resume(file):
    """Analyze a resume PDF and provide feedback using Gemini AI."""
    # Read file contents
    contents = await file.read()
    print("Uploaded file size (bytes):", len(contents))

    if len(contents) < 100:
        return "❌ The uploaded file is too small or empty. Please upload a valid resume."

    # Save PDF temporarily
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(contents)
            tmp.flush()
            tmp_path = tmp.name
            print("Temporary file created:", tmp_path)
    except Exception as e:
        return f"❌ Error creating temporary file: {str(e)}"

    try:
        # Try pdfplumber with OCR
        resume_text = extract_text_with_pdfplumber(tmp_path)
        print("pdfplumber extracted text (first 500 chars):", resume_text[:500])
        print("pdfplumber extracted text length:", len(resume_text))

        # Fallback to PyMuPDF if no text extracted
        if not resume_text.strip():
            print("No text from pdfplumber, trying PyMuPDF...")
            resume_text = extract_text_with_pymupdf(tmp_path)
            print("PyMuPDF extracted text (first 500 chars):", resume_text[:500])
            print("PyMuPDF extracted text length:", len(resume_text))

        # Check if text is empty
        if not resume_text.strip():
            return "❌ No text could be extracted from the PDF. It may be image-based, corrupted, or password-protected. Ensure Tesseract OCR is installed for image-based PDFs or remove password protection."

        # Clean text for validation
        clean_text = re.sub(r"[^\w\s]", "", resume_text)
        print("Cleaned text length:", len(clean_text))
        if len(clean_text) < 10:
            print("Warning: Extracted text is very short, but proceeding with analysis.")

        # Check for resume-like content
        resume_keywords = [
            "experience", "education", "skills", "projects", "certifications",
            "summary", "professional", "contact", "work history", "qualifications",
            "achievements", "employment", "training", "objective", "profile"
        ]
        match_count = sum(1 for kw in resume_keywords if kw.lower() in resume_text.lower())
        print("Keyword matches:", match_count, [kw for kw in resume_keywords if kw.lower() in resume_text.lower()])
        if match_count < 1:
            print("Warning: Low keyword match count, but proceeding with analysis.")

        # Initialize Gemini model
        if not api_key:
            return "❌ Google API key not found. Please set GOOGLE_API_KEY_REVIEW_RESUME in the .env file."
        
        try:
            llm = ChatGoogleGenerativeAI(
                model="gemini-1.5-flash",
                temperature=0.4,
                google_api_key=api_key
            )
        except Exception as e:
            return f"❌ Error initializing Gemini model: {str(e)}"

        # Construct prompt for resume analysis
        prompt = (
            "Review this resume professionally. Provide feedback on:\n"
            "- Clarity\n"
            "- Formatting\n"
            "- Grammar/Spelling\n"
            "- Job impact\n"
            "- ATS (Applicant Tracking System) compatibility\n"
            "Be specific with improvement suggestions.\n"
            "Provide a concise summary of the resume's strengths and weaknesses.\n"
            "Use bullet points for clarity.\n"
            "If the resume is well-structured, mention that as well.\n"
            "If the resume is poorly structured, provide specific suggestions for improvement.\n"
            "Here is the resume text:\n\n"
            f"{resume_text}"
        )

        # Invoke LLM
        try:
            response = llm.invoke(prompt)
            return response.content
        except Exception as e:
            return f"❌ Error during Gemini analysis: {str(e)}"

    except Exception as e:
        return f"❌ An error occurred during resume analysis: {str(e)}"
    finally:
        try:
            os.remove(tmp_path)
            print("Temporary file deleted:", tmp_path)
        except Exception as e:
            print(f"Warning: Could not delete temporary file: {str(e)}")

# For testing locally (optional)
if __name__ == "__main__":
    import asyncio
    async def test_resume():
        # Replace with path to a local test PDF
        test_file_path = "path/to/your/resume.pdf"
        with open(test_file_path, "rb") as f:
            class MockFile:
                async def read(self):
                    return f.read()
            mock_file = MockFile()
            result = await analyze_resume(mock_file)
            print("Analysis result:", result)
    
    asyncio.run(test_resume())