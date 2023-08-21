const mongoose=require("mongoose")



const newschema=mongoose.Schema({
    name : String,
    email : String,
    gender : String,
    password : String,
    age : Number,
    city : String,
    is_married : Boolean,
},
{
    versionKey:false
})

const User= new mongoose.model("user",newschema)
module.exports={User}