import { Schema, model } from 'mongoose';

export interface Flower {
    id: string
    user: string
    name: string
    waterDuration: number
    lastWateredAt: Date|null
    createdAt: Date
    updatedAt: Date
}

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name for the flower.'],
    },
    waterDuration: {
        type: Number,
        required: [true, 'Please add a water duration in hours for the flower.'],
    },
    lastWateredAt: {
        type: Date,
    }
}, {
    timestamps: true,
})

export default model('Flower', schema)
