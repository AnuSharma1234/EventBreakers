import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Your name is required']
    },
    email: {
        type: String,
        required: [true, "Your email is required"],
        unique: true
    },
    password: {
        type: String,
        default: null
    },
    isGoogleAuth: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isRegisterdForLatestEvent : {
        type : Boolean,
        default : false
    }
})


const User = mongoose.model("User", userSchema)

export default User
