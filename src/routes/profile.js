const express= require("express")
const profileRouter= express.Router()
const { userauth } = require("../middleware/user")
const{validatefieldsdata} = require("../utils/constants")


profileRouter.get("/profile",userauth,async(req,res)=>{
  try{
     const user= req.user
     console.log(user)
     res.send(user)
  }
 catch (err) {
  return res.status(400).json({
    message: "Kindly login"
  });
}
})

profileRouter.patch("/profile/edit",userauth,async(req,res)=>{
    const LoggedInuser = req.user
const returnedValue= validatefieldsdata(req)
 if(!returnedValue){
    throw new Error("invalid edit keys")
 }
Object.keys(req.body).every(key=>LoggedInuser[key]=req.body[key])
await LoggedInuser.save()
res.send({message:`${LoggedInuser.firstName} updated profile`,data:LoggedInuser})
})

module.exports= profileRouter
