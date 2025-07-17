import express from 'express';
import { clerkWebhooks } from '../controller/userController.js';
const router = express.Router();

router.route("/webhooks").post(clerkWebhooks)

export default router;