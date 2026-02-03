const User = require("../model/userModel")
const jwt= require("jsonwebtoken")

const userauth= async(req,res,next)=>{
     try{
       const {token}= req.cookies
       const decodeId= await jwt.verify(token,"Dev@tinder1")
       const data= await User.findById({_id:decodeId._id})
       req.user= data
       next()
     }
     catch(err){
       res.status(400).send("error",err.message)
     }
    
}
module.exports={userauth}