import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is connnected")
    }catch(error){
        console.log("Unable to connect to the database")
        console.log(error)
    }
}