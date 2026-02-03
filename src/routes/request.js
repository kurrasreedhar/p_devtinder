const express= require("express")
const requestRouter= express.Router()
const {userauth}= require("../middleware/user")
const ConnectionRequest= require("../model/connectionModel")
const User= require("../model/userModel")


requestRouter.post("/request/send/:status/:toUserId",userauth,async(req,res)=>{
    try{
    const allowedStatus=["interested","ignored"]
    const fromUserId= req.user._id
    const toUserId= req.params.toUserId
    const status=req.params.status

    if(!allowedStatus.includes(status)){
        throw new Error("invalid api status")
    }
    const isConnectionRequestExist=  await ConnectionRequest.findOne({
        $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
    })
   if(isConnectionRequestExist){
    return res.status(400).json({ error: "Cannot send request to yourself" })
   }
   const find= await User.findById(toUserId)
    
     if(!find){
        throw new Error("user details not found using id")
    }
    const newConnectionRequest= new ConnectionRequest({
        fromUserId,
        toUserId,
        status
    })
   
   const data= await newConnectionRequest.save()
   res.json({message:"data of connection ",data})
}
catch(err){
    res.status(400).json({error :err.message})
}})

requestRouter.post("/request/review/:status/:reqId",userauth ,async(req,res)=>{
    try{
const loggedInUser= req.user
const status= req.params.status
const requestId= req.params.reqId
const allowedStatus=["accepted","rejected"]
const isAllowedStatus= allowedStatus.includes(status)
 
if(!isAllowedStatus){
 throw new Error("invalid status")
}

const isConnectionExist= await ConnectionRequest.findOne({_id:requestId,
     toUserId:loggedInUser._id,
     status:"interested"
})
if(!isConnectionExist){
    throw new Error("invalid request")
}
 isConnectionExist.status=status
 const data= await isConnectionExist.save()
 res.json({message:"connection is valid",data})
}
catch(err){
   res.status(400).send("err" + err.message)
}
})


module.exports= requestRouter