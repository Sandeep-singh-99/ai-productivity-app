import { model, Schema } from 'mongoose';

const feedbackFormSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },

    feedback: {
        type: String,
        required: true,
    }
}, { timestamps: true })


const FeedbackForm = model('FeedbackForm', feedbackFormSchema);

export default FeedbackForm;