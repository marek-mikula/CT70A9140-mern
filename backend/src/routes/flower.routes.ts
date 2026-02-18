import express from "express";
import auth from "../middleware/auth.middleware.js";
import {deleteFlower, getFlowers, storeFlower, waterFlower} from "../controllers/flower.controller.js";

const router = express.Router()

router.route('/')
    .get(auth, getFlowers)
    .post(auth, storeFlower)

router.route('/:id')
    .delete(auth, deleteFlower)

router.route('/:id/water')
    .patch(auth, waterFlower)

export default router
