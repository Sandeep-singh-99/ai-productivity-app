import express from 'express'
import { checkAuth, login, logout, register } from '../controller/user.controller.js'
import upload from '../middleware/upload.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
const router = express.Router()

router.route("/signUp").post(upload.single("image"), register)
router.route("/login").post(login)
router.route("/logout").post(authMiddleware, logout)
router.route("/checkAuth").get(authMiddleware, checkAuth)

export default router
