import express from 'express'
import { checkAuth, login, logout, register } from '../controller/user.controller.js'
const router = express.Router()

router.route("/signUp").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/checkAuth").get(checkAuth)

export default router
