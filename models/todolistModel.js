const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    todoName: {
        type: String,
        require: true
    },
    authorId: {
        type: String,
        require: true
    }

})

const todoModel = mongoose.model("todolist", todoSchema)


module.exports = { todoModel }