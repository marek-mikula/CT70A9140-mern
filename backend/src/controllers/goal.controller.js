import expressAsyncHandler from "express-async-handler";
import goalModel from "../model/goal.model.js";

export const getGoals = expressAsyncHandler(async (req, res) => {
    const goals = await goalModel.find()

    res.status(200).json(goals)
})

export const storeGoal = expressAsyncHandler(async (req, res) => {
    const title = req.body.title

    if (! title) {
        res.status(400)
        throw new Error('Please add a title.')
    }

    const goal = await goalModel.create({ title })

    res.status(200).json(goal)
})

export const getGoal = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const goal = await goalModel.findById(id)

    if (!goal) {
        res.status(404)
        throw new Error(`Goal with ID ${id} not found.`)
    }

    res.status(200).json(goal)
})

export const updateGoal = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const title = req.body.title

    if (! title) {
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

export const deleteGoal = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const goal = await goalModel.findByIdAndDelete(id)

    if (!goal) {
        res.status(404)
        throw new Error(`Goal with ID ${id} not found.`)
    }

    res.status(200).json(goal)
})
