import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'

import authRoute from "./routes/authRoute.js"
import userRoute from './routes/userRoute.js'

dotenv.config({
    path: './.env'
})


const app = express()

// middleware
app.use(express.json()),
app.use(express.urlencoded({extended:true}))

// Route
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users', userRoute)

// start server
connectDB().then(()=>{
    app.listen(process.env.PORT || 8080 , ()=>{
        console.log(`Server is running on PORT ${process.env.PORT}`)})
}).catch(error =>{
    console.log("Database connection failed",error)
})
