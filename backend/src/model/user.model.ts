import { Schema, model } from 'mongoose';

export interface User {
    id: string
    name: string
    email: string
    password: string
}

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name.'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password.'],
    },
}, {
    timestamps: true,
})

export default model('User', schema)
