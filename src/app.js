const express= require("express")
const app = express()

app.use("/home",(req,res)=>{
    res.send("hello from home")
})


app.use("/home1",(req,res)=>{
    res.send("hello from home1")
})

app.listen(5567,()=>{
    console.log("hello from 5567")
})