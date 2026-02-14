import mongoose from "mongoose";

const buildDbUri = () => {
    const username = process.env.MONGO_ROOT_USERNAME
    const password = process.env.MONGO_ROOT_PASSWORD
    const host = process.env.MONGO_HOST
    const port = process.env.MONGO_PORT
    const database = process.env.MONGO_DATABASE

    return `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`
}

export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(buildDbUri(), {timeoutMS: 5000})
        console.log(`MongoDB connected: ${connection.connection.host}.`)
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}
