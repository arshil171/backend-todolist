const express = require("express")
const { userModel } = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        let userData = await userModel.find({})
        return res.status(200).json({
            message: userData
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
})

router.post("/add", async (req, res) => {
    let { userName, email, password } = req.body
    password = await bcrypt.hash(password, 10)
    try {
        await userModel.create({ userName, email, password })
        return res.status(201).json({
            message: "user registration succesfully"
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
})

router.post("/login", async(req, res) => {
    let { email, password } = req.body

    let userData = await userModel.findOne({ email })

    if (userData) {
        bcrypt.compare(password, userData.password, (error, result) => {
            if (result) {
                let token = jwt.sign(

                    { userData, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
                    process.env.SECRET_KEY
                )
                console.log(token)
                res.status(200).json({
                    message: "login successfully",
                    token: token
                })
            } else {
                res.status(400).json({
                    message: "password invalid",
                })
            }
        })
    } else {
        res.status(400).json({
            message: "user Not Found"
        })
    }
})

router.delete("/delete/:id", async (req, res) => {

    try {
        const id = req.params.id
        console.log(id)
        await userModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: "user delted successfully",
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }


})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        await userModel.findByIdAndUpdate(id, req.body)
        return res.status(200).json({
            message: "user update successfully",
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
})

module.exports = { router }