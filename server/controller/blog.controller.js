import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";


const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY_BLOG,
  model: "gemini-1.5-flash",
  temperature: 0.2,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful AI that writes high-quality blog posts."],
  [
    "user",
    `Write a detailed blog post on the following topic: {question}. and categorize it under {category}.
    Provide the response in markdown format with:
    - Headings and subheadings
    - Bullet points where appropriate
    - If the question asks for resources, include a list of 5 useful resources with links.
    - Ensure the content is engaging and suitable for a blog audience.
    - If {question} is different from {category}, make sure to respond that the content is not related to the category.`,
  ]
])

const chain = RunnableSequence.from([
  prompt,
  model
])

export const generateBlog = async (req, res) => {
  const { question, category } = req.body;

  if (!question || !category) {
    return res.status(400).json({ message: "Missing 'question' or 'category' in request body" });
  }
  try {
    const response = await chain.invoke({ question, category });

    const blog = response.content ?? response?.text ?? "";

    res.json({ data: blog, message: "Blog generated successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
