export const resumeAnalyze = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Call the AI service to analyze the resume
        const response = await axios.post("http://127.0.0.1:8000/analyze-resume", {
            file: req.file
        });

        const result = response.data.response;

        res.json({ data: result, message: "Resume analyzed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}