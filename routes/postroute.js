
const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { auth } = require("../middleware/auth")
const postroute=express.Router()
const {Post}=require("../model/Post")


postroute.post("/add",auth,async(req,res)=>{
    const token= req.headers.authorization?.split(" ")[1]
    const decoder=jwt.verify(token,"masai")
       const email=decoder.payload
       
try {
     
       const newpost= new Post({...req.body,useremail:email}) 
       await newpost.save()
        res.status(200).send("Post added successfully")
     
    
} catch (error) {
    console.log(error)
    res.status(201).send("something error")
}
})

postroute.get("/",auth,async(req,res)=>{
    const token= req.headers.authorization?.split(" ")[1]
    const decoder=jwt.verify(token,"masai")
       const email=decoder.payload
       const posts=await Post.find({useremail:email})
try {
     if(posts){
        res.status(200).send(posts)
     }
     else{
        res.status(201).send("you dont have post please add")
     }
    
} catch (error) {
    console.log(error)
}
})

postroute.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
        const post=await Post.findById(id)
        if(post){
           await Post.findByIdAndUpdate(id,req.body)
            res.status(200).send("post uppdated succesfully")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send("error")
    }
})
postroute.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
        const post=await Post.findById(id)
        if(post){
            await Post.findByIdAndDelete(id)
            res.status(200).send("post deleted succesfully")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send("error")
        
    }
})


module.exports=postroute