import express from "express";
import goalRoutes from "./src/routes/goal.routes.ts";
import errorMiddleware from './src/middleware/error.middleware.ts'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/goals', goalRoutes)

// Global error handler
app.use(errorMiddleware)

export default app
