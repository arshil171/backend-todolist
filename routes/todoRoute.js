const express = require("express")
const { todoModel } = require("../models/todolistModel")

const todoRoute = express.Router()


todoRoute.post("/", async (req, res) => {
    const { authorId, todoName } = req.body

    try {
        await todoModel.create({ authorId, todoName })
        return res.status(201).json({ message: "task added sucessfully" });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

})
todoRoute.get("/", async (req, res) => {
    const { authorId } = req.body

    try {
        let todolistData = await todoModel.find({ authorId })
        return res.status(201).json({ message: todolistData });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
})

module.exports = { todoRoute }