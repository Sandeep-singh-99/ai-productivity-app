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


const app = express();
const PORT = process.env.PORT || 5001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
})

app.use(limiter);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(csrf({cookie: true}));

// Send CSRF token to frontend
app.get("/api/v1/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});


app.use('/api/v1/user', userRoutes);

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


