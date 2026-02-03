const express = require("express");
const {Validation}= require("../utils/constants");
const bcrypt= require("bcrypt")
const User= require("../model/userModel");

const authRouter= express.Router()


authRouter.post("/signup",async(req,res)=>{
    Validation(req)
    try{
       const {firstName,lastName,emailId,password} = req.body
       const passwordhash= await bcrypt.hash(password,10)
      const user= new User({firstName,lastName,emailId,password:passwordhash})
     const savedUser=  await user.save()
       const token = await savedUser.getJWT()
      res.cookie("token",token,{expires: new Date(Date.now() + 24 * 3600000)})
        
       res.json({message:"user saved successfully",data:savedUser})
    
    }
    catch(err){
        res.send("error while signup"+err)
    }
})

authRouter.post("/login",async(req,res)=>{
  try{
   
    const {emailId,password}=req.body;
    const user= await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("invalid credentials")
    }
    const isPasswordValid= await user.validatePassword(password)
    if(isPasswordValid){
         const token = await user.getJWT()
      res.cookie("token",token,{expires: new Date(Date.now() + 24 * 3600000)})
      res.send(user)
    } 
    else{
      throw new Error("invalid password")
    }
  }
  catch(err){
    res.status(400).send("Error"+err.message)
  }
})

authRouter.post("/logout",async(req,res)=>{
    try{
        res.cookie("token",null,{expires: new Date(Date.now())})
        res.send("logout sucessfully ")
    }
    catch(err){
        res.status(400).send("error" +err.message)
    }
})

module.exports= authRouter