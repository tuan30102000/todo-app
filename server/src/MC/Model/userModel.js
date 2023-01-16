import { model, Schema } from "mongoose";
import listDefalult from '../../constan/listDefault.js';
import medthod from '../../constan/medthod.js';
import validator from "validator";
const { isEmail } = validator
const random = medthod.rangeRandom
const userSchema = Schema({
    username: {
        type: String,
        required: [true, "Required"],
        minlength: [6, "Must be at least 6 characters"],
        maxlength: [20, "Must be less than 20 characters"],
        unique: true,
        trim: true,
    },
    displayName: {
        type: String,
        default: "New User",
        maxlength: [20, "Must be less than 20 characters"],
        trim: true,
    },
    about: {
        type: String,
        maxlength: [100, "Must be 50 characters or less"],
        default: "I'm a new user",
        trim: true,
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    avatarUrl: {
        type: String,
        default: listDefalult.listUrlAvtDefault[random(5)],
    },
    email: {
        type: String,
        required: [true, "Required"],
        maxlength: [50, "Must be 50 characters or less"],
        unique: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Required"],
        select: false,
        minlength: [8, "Must be 8 characters or more"],
    },
})
export default model('user', userSchema)