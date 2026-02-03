const mongoose=require("mongoose")
const connectdb=async()=>{
    await mongoose.connect(process.env.MONGO_URL)}
module.exports = connectdb