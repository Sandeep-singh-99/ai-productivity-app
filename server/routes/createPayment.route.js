import express from 'express';
import { createPayment, getPaymentPlans } from '../controller/createPayment.controller.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.route("/create-payment-plan").post( authorizeRoles("admin"), createPayment)

router.route("/get-payment-plans").get(getPaymentPlans)

export default router;