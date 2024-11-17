import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"



const connectDB = async ()=>{ // async method jb bhi chalta h toh ek promise return krta hai
    try {
        // mongodb  return an object
        const connectionInstance =await mongoose.connect
        (`${process.env.MOGODB_URI}/${DB_NAME}`)
        console.log(` \n MongoDb connected with ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDb connection error",error)
        process.exit(1)// instance of process give by nodejs
    }

}

export default connectDB;