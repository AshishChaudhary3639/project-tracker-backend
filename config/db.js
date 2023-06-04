// Creating Database name MongoDB using mongoose
const mongoose=require('mongoose')
require('dotenv').config()
const connection=mongoose.connect(`${process.env.MONGODB_URL}`)

module.exports={connection}