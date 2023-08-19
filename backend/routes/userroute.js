const express = require("express");
const bcrypt=require("bcrypt");
const { Usermodel } = require("../models/User");
const jwt = require("jsonwebtoken");

const userrouter=express.Router()


userrouter.post("/register",async(req,res)=>{
    const {username,email,pass}=req.body
    try {
        bcrypt.hash(pass, 10, async(err, hash) =>{
           if(err){
            res.send({"msg":err,"err":"something is error"})
           }else{
                const user=new Usermodel({username,email,pass:hash})
                await user.save()
                res.status(200).send("registered succesfully😊")
           }
        });
    } catch (error) {
      console.log(error)  
    }
})

userrouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await Usermodel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                  const token=jwt.sign({name:"Anuraag"},"masai")
                  
            res.send({"msg":"login Succesfully 👍","token":token})
                }
            })
          
        }else{
          res.send("user not found! please register")
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports=userrouter