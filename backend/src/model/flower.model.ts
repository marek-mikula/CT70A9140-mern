import { Schema, model } from 'mongoose';

export interface Flower {
    id: string
    user: string
    name: string
    waterDuration: number
    lightLevel: 'low' | 'medium' | 'bright'
    soilType: 'standard' | 'cactus_succulent' | 'peat_moss' | 'orchid_bark'
    room: string
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
        required: [true, 'Please add a name.'],
    },
    waterDuration: {
        type: Number,
        required: [true, 'Please add a water duration.'],
    },
    lightLevel: {
        type: String,
        required: [true, 'Please add a light level.'],
        enum: [
            'low',
            'medium',
            'bright',
        ],
    },
    soilType: {
        type: String,
        required: [true, 'Please add a soil type.'],
        enum: [
            'standard',
            'cactus_succulent',
            'peat_moss',
            'orchid_bark',
        ],
    },
    room: {
        type: String,
        required: [true, 'Please add a room.'],
    },
    lastWateredAt: {
        type: Date,
    },
}, {
    timestamps: true,
})

export default model('Flower', schema)
