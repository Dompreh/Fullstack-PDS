const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const authRouter = require('./routes/auth')

//MIDDLEWARES
app.use(cors())
app.use(express.json())



//DB Connection
const DB = process.env.DB
mongoose.connect(DB).then(()=>{
    console.log("Database connected successfully")
}).catch((err) =>{
    console.log("Error:", err)
})

//ROUTES
app.use("/auth", authRouter)



//SERVER
const PORT = process.env.PORT || 7000 
app.listen(PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`)
})