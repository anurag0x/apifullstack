const express = require("express");
const  {NoteModel}  = require("../models/Notes");
const {auth} = require("../middleware/authentication");

const noterouter=express.Router()
 
noterouter.post("/add",auth,async(req,res)=>{
   
  try {
    const note=new NoteModel(req.body)
    await note.save();
    res.status(201).send({"msg":"note added succesfully"})
  } catch (error) {
    console.log(error);
  }                      
})
noterouter.get("/:id",auth,async(req,res)=>{
  let id= req.params.id;
  try {
    const note=await NoteModel.findById(id)
  
    res.status(201).send(note)
  } catch (error) {
    console.log(error);
  }                      
})
noterouter.get("/",auth,async(req,res)=>{
    try {
      const note=await NoteModel.find()
    
      res.status(201).send(note)
    } catch (error) {
      console.log(error);
    }                      
  })
  noterouter.patch("/update/:id",auth, async (req, res) => {
    const {id} = req.params;
    const note=await NoteModel.findById(id)
    try {
      console.log(note)
      // Use findByIdAndUpdate to update the document based on its ID
     if(note){
      await NoteModel.findByIdAndUpdate(id, req.body);
      res.status(200).send({"msg":"Note updated successfully","note":note});
     }
    
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred while updating the note");
    }
  });
  
  noterouter.delete("/delete/:id",auth, async (req, res) => {
    const {id} = req.params; // Get the note ID from the request parameters
    try {
      await NoteModel.findByIdAndDelete({_id:id}); 
      
      res.status(200).send("Note deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred while deleting the note");
    }
  });
module.exports={noterouter}