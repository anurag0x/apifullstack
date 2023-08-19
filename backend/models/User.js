const { default: mongoose } = require("mongoose");



const userSchema=mongoose.Schema({
    username:String,
    email:String,
    pass:String, 
})
const Usermodel=new mongoose.model("user",userSchema)

module.exports={Usermodel}