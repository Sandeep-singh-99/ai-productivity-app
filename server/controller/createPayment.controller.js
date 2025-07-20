import CreatePayment from "../models/createPayment.model.js";

export const createPayment = async (req, res) => {
    try {
        const { planName, price, content } = req.body;
        if (!planName || !price || !content) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const contentArray = content.split(',').map(item => item.trim());

        const newPaymentPlan = await CreatePayment.create({
            planName,
            price,
            content: contentArray
        })

        res.status(201).json({ message: "Payment plan created successfully", data: newPaymentPlan, success: true });
    } catch (error) {
        res.status(500).json({ message: "Error creating payment plan", error: error.message, success: false });
    }
}

export const getPaymentPlans = async (req, res) => {
    try {
        const paymentPlans = await CreatePayment.find();
        res.status(200).json({ message: "Payment plans fetched successfully", data: paymentPlans, success: true });
    } catch (error) {
        res.status(500).json({ message: "Error fetching payment plans", error: error.message, success: false });
    }
}

export const updatePaymentPlan = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deletePaymentPlan = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}