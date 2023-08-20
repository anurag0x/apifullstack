const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1]
    console.log(token)
    try {
      if(token){
         const  decode=jwt.verify(token,"masai")
         console.log(decode);
         if(decode){  
       
      next()
      return
         }
         else{
          res.send("please login!")
         }
      }
    } catch (error) {
      console.log(err)

    }
   

}
module.exports={auth}