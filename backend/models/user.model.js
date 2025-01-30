import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
        default: ""
    },

    headline: {
        type: String,
        default: "Socio User"
    },

    about: {
        type: String,
        default: ""
    },

    websitelink : {
        type: String, 
        default: ""
    },

    connections : [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }]
},{timestamps:true})


const User = mongoose.model("User", userSchema)

export default User;