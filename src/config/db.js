import mongoose from "mongoose";
import {DB_NAME} from '../constant.js'


const connectDB = async () =>{
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB Database Connected || DB HOST ${dbInstance.connection.host}`)
    } catch (error) {
        console.log("Database connection Failed",error.message)
    }
}

export default connectDB