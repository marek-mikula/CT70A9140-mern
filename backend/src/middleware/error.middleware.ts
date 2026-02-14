import type {NextFunction, Request, Response} from "express";

const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isProduction = process.env.NODE_ENV === 'production'

    res
        .status(res.statusCode ?? 500)
        .json({
            message: err.message,
            trace: isProduction ? null : err.stack
        })
}

export default errorMiddleware
