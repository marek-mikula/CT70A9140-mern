import asyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import flowerModel, {type Flower} from "../model/flower.model.ts";

export const getFlowers = asyncHandler(async (
    req: Request,
    res: Response
) => {
    const flowers = await flowerModel.find<Flower>({
        user: req.user!.id
    })

    res.status(200).json(flowers)
})

export const storeFlower = asyncHandler(async (
    req: Request,
    res: Response
) => {
    const name = req.body.name
    const waterDuration = req.body.waterDuration
    const lightLevel = req.body.lightLevel
    const soilType = req.body.soilType
    const room = req.body.room

    if (!name || !waterDuration || !lightLevel || !soilType || !room) {
        res.status(400)
        throw new Error('Invalid data.')
    }

    const flower = await flowerModel.create({
        user: req.user!.id,
        name,
        waterDuration,
        lightLevel,
        soilType,
        room,
        lastWateredAt: null,
    })

    res.status(201).json(flower)
})

export const deleteFlower = asyncHandler(async (
    req: Request,
    res: Response
) => {
    const id = req.params.id
    const flower = await flowerModel.findOneAndDelete({
        _id: id,
        user: req.user!.id
    })

    if (!flower) {
        res.status(404)
        throw new Error(`Flower with ID ${id} not found.`)
    }

    res.status(200).json(flower)
})

export const waterFlower = asyncHandler(async (
    req: Request,
    res: Response
) => {
    const id = req.params.id
    const flower = await flowerModel.findOne({
        _id: id,
        user: req.user!.id
    })

    if (!flower) {
        res.status(404)
        throw new Error(`Flower with ID ${id} not found.`)
    }

    flower.lastWateredAt = new Date()
    flower.save()

    res.status(200).json(flower)
})
