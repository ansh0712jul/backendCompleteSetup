import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:"./.env"
})
// db connection ..
connectDB()
.then( () => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
})
.catch( err => console.log("MongoDb connection failed",err))