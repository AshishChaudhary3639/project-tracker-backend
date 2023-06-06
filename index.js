const express=require('express')
const { connection } = require('./config/db')
const cors=require('cors')
const { userRoute } = require('./routes/user.route')
const { projectRoute } = require('./routes/project.route')
require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('Welcome to home page')
})
app.use('/',userRoute)
app.use('/',projectRoute)
app.listen(process.env.PORT,async()=>{
    // Connecting server to Database when page gatting load
    try {
        await connection
        console.log('DB connected')
    } catch (error) {
        console.log('DB not connected')
        console.log(error)
        
    }
})