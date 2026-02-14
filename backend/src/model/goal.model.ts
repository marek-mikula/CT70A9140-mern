import { Schema, model } from 'mongoose';

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title of the goal.'],
    }
}, {
    timestamps: true,
})

export default model('Goal', schema)
