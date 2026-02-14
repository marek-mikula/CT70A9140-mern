import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title of the goal.'],
    }
}, {
    timestamps: true,
})

export default mongoose.model('Goal', goalSchema)
