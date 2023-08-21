const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1]
    try {
      if(token){
      
       
         const decoder=jwt.verify(token,"masai")
         if(decoder)
          
        next()
        return
         }
         else{
          res.send("please login!")
         }
    } catch (error) {
      console.log(error)

    }
   

}
module.exports={auth}