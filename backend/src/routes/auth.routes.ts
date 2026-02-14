import express from "express";
import {loginUser, getMe, registerUser} from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', auth, getMe)

export default router
