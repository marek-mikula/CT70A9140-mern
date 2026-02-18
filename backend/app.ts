import express from "express";
import flowerRoutes from "./src/routes/flower.routes.ts";
import authRoutes from "./src/routes/auth.routes.ts";
import handleErrors from './src/middleware/error.middleware.ts'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/flowers', flowerRoutes)
app.use('/api/auth', authRoutes)

// Global error handler
app.use(handleErrors)

export default app
