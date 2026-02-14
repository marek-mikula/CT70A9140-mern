import expressAsyncHandler from "express-async-handler";

export const getGoals = expressAsyncHandler(async (req, res) => {
    res.status(200).json({message: 'List of goals'})
})

export const storeGoal = expressAsyncHandler(async (req, res) => {
    res.status(200).json({message: 'Create a goal'})
})

export const getGoal = expressAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id)
    res.status(200).json({message: `Find a goal with ID: ${id}`})
})

export const updateGoal = expressAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id)
    res.status(200).json({message: `Update a goal with ID: ${id}`})
})

export const deleteGoal = expressAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id)
    res.status(200).json({message: `Delete a goal with ID: ${id}`})
})
