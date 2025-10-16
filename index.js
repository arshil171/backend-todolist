const express = require("express")
const { dbconnect } = require("./config/dbconnect")
const { router } = require("./routes/userRoutes")
const { auth } = require("./middleware/auth")
const { todoRoute } = require("./routes/todoRoute")
const cors = require("cors")
const app = express()

require("dotenv").config()

app.use(express.urlencoded({ extended: true }))


app.use(express.json())

app.use(cors())

app.use("/", router)

app.use(auth)

app.use("/", todoRoute)

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("server is not running")
    }
    dbconnect()
    console.log("server is running at", process.env.PORT)
})