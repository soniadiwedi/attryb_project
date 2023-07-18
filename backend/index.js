const express=require('express')
const cors=require('cors');
const { connection } = require('./controller/db');
require("dotenv").config();

const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(res,req)=>{
    res.send(`<h1>Hello Dealers</h1>`)
})


app.listen(process.env.PORT,async(req,res)=>{
    try{
        await connection
        console.log("server is connected to mongoDB");
    }catch(err){
        console.log(err);
    }
    console.log(`server in running on the ${process.env.PORT}`);
})