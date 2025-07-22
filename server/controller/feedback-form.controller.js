import FeedbackForm from "../models/feedback-form.model.js";

export const createFeedbackForm = async (req, res) => {
    try {
        const { feedback } = req.body;
        const userId = req.user.id;

        if (!feedback) {
            return res.status(400).json({ message: 'Feedback is required', success: false });
        }

        const newFeedback = await FeedbackForm.create({
            userId,
            feedback
        })

        res.status(201).json({ data: newFeedback, message: 'Feedback submitted successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

export const getFeedbackForms = async (req, res) => {
    try {
        const feedbackForms = await FeedbackForm.find().populate('userId', 'firstName lastName email imageUrl ').sort({ createdAt: -1 });

        if (!feedbackForms.length) {
            return res.status(404).json({ message: 'No feedback forms found', success: false });
        }
        res.status(200).json({ data: feedbackForms, message: 'Feedback forms retrieved successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}