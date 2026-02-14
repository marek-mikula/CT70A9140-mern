import mongoose from "mongoose";

const buildDbUri = () => {
    const username = process.env.MONGO_ROOT_USERNAME || ''
    const password = process.env.MONGO_ROOT_PASSWORD || ''
    const host = process.env.MONGO_HOST || 'localhost'
    const port = Number(process.env.MONGO_PORT) || 27017
    const database = process.env.MONGO_DATABASE || 'mern'

    return `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`
}

export const connectDb = async () => {
    try {
        await mongoose.connect(buildDbUri(), {timeoutMS: 5000})
        console.log('MongoDB connected.')
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}
