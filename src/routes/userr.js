const express= require("express")
const { userauth } = require("../middleware/user")
const userRouter = express.Router()
const ConnectionRequest= require("../model/connectionModel")
const Users= require("../model/userModel")
const User_data="firstName lastName emailId bio skills photoUrl"

userRouter.get("/user/request/pendings",userauth,async(req,res)=>{
    const loggedInUser= req.user._id
    const pendingRequest= await ConnectionRequest.find({
        toUserId:loggedInUser,
        status:"interested"
    }).populate("fromUserId","firstName lastName age bio photoUrl gender")
   if(!pendingRequest){
    throw new Error("no pending requests")
   }
   res.json({message:"pending requests",pendingRequest})

})

userRouter.get("/user/request/connections",userauth,async(req,res)=>{
    const loggedInUser= req.user._id
    const connections= await ConnectionRequest.find({
        $or:[{fromUserId:loggedInUser, status:"accepted"},{toUserId:loggedInUser, status:"accepted"}],
    }).populate("fromUserId","firstName lastName gender age bio photoUrl").populate("toUserId","firstName lastName gender age bio photoUrl")
     const requests= connections.map((row)=>{
        if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
            return row.toUserId
        }
        return row.fromUserId
     })
     res.json({message:"connections",requests})
})

userRouter.get("/feed",userauth,async(req,res)=>{
    try{ 
        console.log(typeof(req.query.page))
        const page= parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip= (page-1)*limit

    const loggedInUserId= req.user._id
  
    const users= await ConnectionRequest.find({
        $or:[{fromUserId:loggedInUserId},{toUserId:loggedInUserId}]
    }).select("fromUserId toUserId" )

    const connectionrequestedids=new Set()
     users.forEach((val)=>{
        connectionrequestedids.add(val.fromUserId.toString())
        connectionrequestedids.add(val.toUserId.toString())}  )

     const feedUsers= await Users.find({
        $and:[{_id:{$nin:Array.from(connectionrequestedids)}},{_id:{$ne:loggedInUserId}}]
     }).select(User_data).skip(skip).limit(limit) 
  
   res.json({message:"feed user",feedUsers})
    
    }
catch(err){
 res.status(400).json({ message: err.message });
}
})
module.exports= userRouter