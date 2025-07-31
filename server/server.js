import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit'
import helmet from 'helmet';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

import { ConnectDB } from './config/db.js';
import userRoutes from './routes/user.router.js'
import createPaymentPlanRoutes from './routes/createPayment.route.js';
import aiRoutes from './routes/ai.routes.js';
import feedbackFormRoutes from './routes/feedback-form.route.js';


const app = express();
const PORT = process.env.PORT || 5001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
})

app.use(limiter);
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(csrf({cookie: true}));

// Send CSRF token to frontend
app.get("/api/v1/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/plan', createPaymentPlanRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/feedback', feedbackFormRoutes);

app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({
      message: "invalid csrf token",
      success: false,
    });
  }
  next(err);
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    ConnectDB();
})


