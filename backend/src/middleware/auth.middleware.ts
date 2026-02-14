import asyncHandler from "express-async-handler";
import type {NextFunction, Request, Response} from "express";
import userModel from "../model/user.model.js";
import tokenManager from "../services/token-manager.js";

const auth = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let headerValue = req.headers.authorization

    if (! headerValue || ! headerValue.startsWith('Bearer ')) {
        res.status(401)
        throw new Error('Not authenticated.')
    }

    const token = headerValue.split(' ')[1]!

    let decodedToken

    try {
        decodedToken = tokenManager.verify(token)
    } catch (e: any) {
        res.status(401)
        throw new Error('Not authenticated.')
    }

    const user = await userModel.findById(decodedToken.id)

    if (! user) {
        res.status(401)
        throw new Error('Not authenticated.')
    }

    req.user = user

    next()
})

export default auth
