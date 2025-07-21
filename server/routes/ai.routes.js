import express from 'express';
import { generateBlog } from '../controller/blog.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route("/blog-generate").post(authMiddleware, generateBlog)

export default router;