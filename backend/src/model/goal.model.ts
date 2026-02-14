import { Schema, model } from 'mongoose';

export interface Goal {
    id: string
    title: string
    user: string
}

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title of the goal.'],
    }
}, {
    timestamps: true,
})

export default model('Goal', schema)
