const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }, 


},
    { timestamps: true })

const userModel = mongoose.model("user", userSchema)


module.exports = { userModel }