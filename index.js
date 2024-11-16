const express = require("express");
const app = express();
const path= require("path");
const userRoute= require("./routes/user.route.js")
const mongoose= require("mongoose");


const PORT=8080;
mongoose.connect("mongodb+srv://anshagrawal1cs22:pTsSfXR4mh0uhP4i@cluster0.z2xvs.mongodb.net/")
.then((e)=>{
    console.log("Connected to database");
})
.catch((e)=>{
    console.log(e)
    
})
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false })); // For parsing form data
app.use(express.json());

app.get("/", (req, res)=>{
    res.render("home");
})

app.use("/user", userRoute);

const port= 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
