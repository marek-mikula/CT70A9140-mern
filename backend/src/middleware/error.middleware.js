const errorMiddleware = (err, req, res, next) => {
    const isProduction = process.env.NODE_ENV === 'production'

    res
        .status(res.statusCode ?? 500)
        .json({
            message: err.message,
            trace: isProduction ? null : err.stack
        })
}

export default errorMiddleware
