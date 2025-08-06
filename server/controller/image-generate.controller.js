// import axios from 'axios';

// export const imageGenerate = async (req, res) => {
//     try {
//         const response = await axios.post(`${process.env.FASTAPI_URL}/generate-image`, {
//             context,
//             style
//         })

//         const result = response.data.response;

//         res.json({ data: result, message: "Image generated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY_IMAGE_GENERATE);
const MODEL = "models/gemini-2.0-flash-preview-image-generation";

export const generateImage = async (req, res) => {
  const { context = "", style = "" } = req.body;
  if (!context && !style) {
    return res
      .status(400)
      .json({ message: "At least one of 'context' or 'style' must be provided." });
  }

  try {
    const prompt = style
      ? `Generate an image of ${context} in the style of ${style}.`
      : `Generate an image of ${context}.`;

    const model = genAI.getGenerativeModel({ model: MODEL });

    const result = await model.generateContent({
      contents: [
        {
          text: prompt,
        },
      ],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    });

    const part = result.candidates[0].content.parts.find(
      (p) => p.mimeType?.startsWith("image/")
    );
    if (!part || !part.uri) {
      throw new Error("No image returned");
    }

    return res.json({ image: part.uri });
  } catch (err) {
    console.error("Image generation error:", err);
    return res.status(500).json({ error: err.message });
  }
};