const mongoose = require("mongoose")

const dbconnect = async () => {
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("database successfully connected")
}
  
module.exports = { dbconnect }