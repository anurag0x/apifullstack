const express = require("express");
const connection = require("./db");
const userrouter = require("./routes/userroute");
const { noterouter } = require("./routes/noteroutes");

const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hii ,its a Homepage")
})
app.use("/user",userrouter)
app.use("/note",noterouter)
app.listen(8080,async(req,res)=>{
    try {
        await connection
        console.log("server is running")
    } catch (error) {
        console.log(error)
    }
})