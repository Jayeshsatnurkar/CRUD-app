
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({path:"./config.env"})

let conn=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODBSTRING)
    }catch(err){
        console.log("Unable to connect with mongodb",err)
    }
}

conn()