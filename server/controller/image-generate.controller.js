import axios from 'axios';

export const imageGenerate = async (req, res) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/generate-image", {
            context,
            style
        })

        const result = response.data.response;

        res.json({ data: result, message: "Image generated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}