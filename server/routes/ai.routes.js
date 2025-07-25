import express from 'express';
import { generateBlog } from '../controller/blog.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { generateArticle } from '../controller/article.controller.js';
import { imageGenerate } from '../controller/image-generate.controller.js';
import { resumeAnalyze } from '../controller/resume-analyze.controller.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.route("/blog-generate").post(authMiddleware, generateBlog)

router.route("/article-generate").post(authMiddleware, generateArticle)

router.route("/image-generate").post(authMiddleware, imageGenerate);

router.route("/resume-analyze").post(authMiddleware, upload.single("file"), resumeAnalyze)

export default router;