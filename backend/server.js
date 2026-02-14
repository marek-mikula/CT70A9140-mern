import express from 'express'
import dotenv from 'dotenv'
import errorMiddleware from "./src/middleware/error.middleware.js";
import goalRoutes from "./src/routes/goal.routes.js";

dotenv.config()

const port = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', goalRoutes)

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server started on port ${port}.`)
})
