const express=require("express")
const { connection } = require("./db")
const {userroute} = require("./routes/userroute")
const app=express()
const cors=require("cors")
const postroute = require("./routes/postroute")

app.use(express.json())
app.use(cors())
app.use("/users",userroute)
app.use("/posts",postroute)
app.listen(8080,async()=>{
    try {
        await connection
        console.log("server is running at port 8080")
    } catch (error) {
        console.log(error)
    }
   
})