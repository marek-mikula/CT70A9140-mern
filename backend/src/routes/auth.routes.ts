import express from "express";
import {loginUser, getMe, registerUser} from "../controllers/auth.controller.js";

const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)

export default router
