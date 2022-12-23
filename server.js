const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser=require("body-parser");
const app =express();
const path=require('path');


require("dotenv").config();

const PORT= process.env.PORT || 8080; //  when hosting to the server can assign available port or local machine port =8070 

app.use(cors());
app.use(bodyparser.json());

//database connection

const URL =process.env.MONGODB_URL;
mongoose.connect(URL);
const connection =mongoose.connection;
connection.once("open",()=>{
    console.log("mongodb Connection success!");
})

const studentRouter= require("./routes/students");
app.use("/student",studentRouter);

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('frontend/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    });
}

app.listen(PORT,()=>{
    console.log('server is up and runing on port:',PORT);
})