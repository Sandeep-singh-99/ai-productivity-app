import axios from "axios";

export const generateBlog = async (req, res) => {
  const { question, category } = req.body;
  try {
    const response = await axios.post("http://127.0.0.1:8000/blog", {
      query: question, 
      category: category,
    });
    const blog = response.data.response;

    res.json({ data: blog, message: "Blog generated successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
