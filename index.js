//necessary imports
const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/authentication");
const authMiddleware = require("./middlewares/auth.middleware");

//creating server instance
const app = express();




//middlewares
app.use(express.json())
app.use('/',authMiddleware)




//routes
app.get('/',(req,res)=>{
    res.send('HOME PAGE')
})

app.get('/about',(req,res)=>{
    res.send('ABOUT PAGE')
})

app.get('/contact',(req,res)=>{
    res.send('CONTACT PAGE')
})

//Routes
app.use('/',authRoute)



//configuring env for environment variables
env.config();

//settingup mongodb atlas connection
mongoose.connect(process.env.MONGO_URI, ()=>{
    console.log("Connected to mongoDB atlas")
})

app.listen(process.env.PORT_NUMBER ,()=>{
    console.log(`Server started @PORT: ${process.env.PORT_NUMBER}`)
})