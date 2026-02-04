const mongoose=require("mongoose")
const connectdb=async()=>{
    
    await mongoose.connect(process.env.mongo_url)}
module.exports = connectdb