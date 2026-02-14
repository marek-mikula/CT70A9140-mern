import express from "express";
import {deleteGoal, getGoal, getGoals, storeGoal, updateGoal} from "../controllers/goal.controller.js";

const router = express.Router()

router.route('/')
    .get(getGoals)
    .post(storeGoal)

router.route('/:id')
    .get(getGoal)
    .put(updateGoal)
    .delete(deleteGoal)

export default router
