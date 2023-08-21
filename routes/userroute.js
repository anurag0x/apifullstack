

const express=require("express")
const { User } = require("../model/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { auth } = require("../middleware/auth")
const userroute=express.Router()
let Blacklist=new Array()

userroute.post("/register",async(req,res)=>{
    const {password,email}=req.body
    try {
       const user=await User.findOne({email})
        if(user){
    res.status(400).send("User already exist, please login")

        }
        else{
            const hash=bcrypt.hashSync(password,8)
          const newuser=  new User({...req.body,password:hash})
          await newuser.save()
          res.status(200).send({"msg":"User registered Successfully","user":{newuser}})
        }
    } catch (error) {
        console.log(error)
    }
})

userroute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                   const token=jwt.sign({payload:user.email},"masai") 
                   res.status(201).send({"msg":"Login Successfully","token":{token}})
                }
                else{
                    res.status(401).send("Something is wrong")  
                }
            })
            

        }
    } catch (error) {
        console.log(error)
        res.status(401).send("Something is wrong")  
    }
})
userroute.get("/logout",async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try {
        Blacklist.push(token)
        res.status(200).send("logout success")  
    } catch (error) {
        console.log(error)
        res.status(401).send("Something is wrong")  
    }
    
   
})

module.exports={userroute}
