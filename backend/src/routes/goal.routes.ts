import express from "express";
import {deleteGoal, getGoal, getGoals, storeGoal, updateGoal} from "../controllers/goal.controller.ts";
import auth from "../middleware/auth.middleware.js";

const router = express.Router()

router.route('/')
    .get(auth, getGoals)
    .post(auth, storeGoal)

router.route('/:id')
    .get(auth, getGoal)
    .put(auth, updateGoal)
    .delete(auth, deleteGoal)

export default router
