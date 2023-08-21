const mongoose=require("mongoose")



const newschema=mongoose.Schema({
    title: String,
body :String,
device : String,
no_of_comments : Number,
useremail:String
},
{
    versionKey:false
})

const Post=new mongoose.model("post",newschema)
module.exports={Post}