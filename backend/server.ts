import {connectDb} from "./src/config/db.ts";
import app from './app.ts'
import dotenv from 'dotenv'
import path from 'path';

const result = dotenv.config({ path: path.resolve(process.cwd(), '../.env') })

if (result.error) {
    console.error('Failed to load .env file.')
    process.exit(1)
}

const port = Number(process.env.API_PORT) || 8080

await connectDb()

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})
