import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import userModel from "../model/user.model.js";
import bcrypt from 'bcrypt'
import tokenGenerator from "../services/token-generator.js";

export const registerUser = expressAsyncHandler(async (
    req: Request,
    res: Response
) => {
    const {
        name,
        email,
        password
    } = req.body

    if (! name || !email || !password) {
        res.status(400)
        throw new Error('Please add name, email and password.')
    }

    const userExists = await userModel.exists({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
    })

    if (!user) {
        res.status(400)
        throw new Error('Invalid user data.')
    }

    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email
    })
})

export const loginUser = expressAsyncHandler(async (
    req: Request,
    res: Response
) => {
    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please add email and password.')
    }

    const user = await userModel.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: tokenGenerator.generate(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials.')
    }
})

export const getMe = expressAsyncHandler(async (
    req: Request,
    res: Response
) => {
    res.status(200).json({})
})
