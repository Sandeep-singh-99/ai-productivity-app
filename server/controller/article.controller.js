import axios from "axios";

export const generateArticle = async (req, res) => {
    const { question } = req.body;
    try {
        const response = await axios.post("http://127.0.0.1:8000/article", {
            question
        })

        const article = response.data.response;

        res.json({ data: article, message: "Article generated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}