const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1]
    if(token){
       const  decode=jwt.verify(token,"masai")
       if(decode){  
     console.log(decode);
    next()
       }
       else{
        res.send("please login!")
       }
    }else{
        res.send("please login!")
       }


}
module.exports={auth}