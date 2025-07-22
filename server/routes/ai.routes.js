import express from 'express';
import { generateBlog } from '../controller/blog.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { generateArticle } from '../controller/article.controller.js';

const router = express.Router();

router.route("/blog-generate").post(authMiddleware, generateBlog)

router.route("/article-generate").post(authMiddleware, generateArticle)

export default router;