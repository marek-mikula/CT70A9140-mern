import asyncHandler from "express-async-handler";
import goalModel from "../model/goal.model.ts";
import type {Request, Response} from "express";

export const getGoals = asyncHandler(async (
    req: Request,
    res: Response
) => {
    const goals = await goalModel.find()

    res.status(200).json(goals)
})

export const storeGoal = asyncHandler(async (
    req: Request,
    res: Response
) => {
    const title = req.body.title

    if (!title) {
        res.status(400)
        throw new Error('Please add a title.')
    }

    const goal = await goalModel.create({title})

    res.status(200).json(goal)
})

export const getGoal = asyncHandler(async (
    req: Request,
    res: Response
) => {
    const id = req.params.id
    const goal = await goalModel.findById(id)

    if (!goal) {
        res.status(404)
        throw new Error(`Goal with ID ${id} not found.`)
    }

    res.status(200).json(goal)
})

export const updateGoal = asyncHandler(async (
    req: Request,
    res: Response
) => {
    const id = req.params.id
    const title = req.body.title

    if (!title) {
        res.status(400)
        throw new Error('Please add a title.')
    }

    const goal = await goalModel.findById(id)

    if (!goal) {
        res.status(404)
        throw new Error(`Goal wi th ID ${id} not found.`)
    }

    goal.title = title
    goal.save()

    res.status(200).json(goal)
})

export const deleteGoal = asyncHandler(async (
    req: Request,
    res: Response
) => {
    const id = req.params.id
    const goal = await goalModel.findByIdAndDelete(id)

    if (!goal) {
        res.status(404)
        throw new Error(`Goal with ID ${id} not found.`)
    }

    res.status(200).json(goal)
})
