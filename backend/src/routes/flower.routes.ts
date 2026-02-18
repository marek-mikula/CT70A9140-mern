import express from "express";
import auth from "../middleware/auth.middleware.js";
import {deleteFlower, getFlowers, storeFlower} from "../controllers/flower.controller.js";

const router = express.Router()

router.route('/')
    .get(auth, getFlowers)
    .post(auth, storeFlower)

router.route('/:id')
    .delete(auth, deleteFlower)

export default router
