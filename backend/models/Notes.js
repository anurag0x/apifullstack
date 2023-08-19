const mongoose = require("mongoose");


const noteschema=mongoose.Schema({
   
    title:String,
        body:String,
        userId:String,
        user:String},{
            versionKey:false
        }
            )
            const NoteModel= new mongoose.model('Note',noteschema);
            module.exports=
                {NoteModel}
                

