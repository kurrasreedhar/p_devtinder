const mongoose=require("mongoose")
const connectdb=async()=>{
    
    await mongoose.connect("mongodb+srv://vijaysnodeproject:cBDbfMuQ14qlSXcn@vijaysnodeproject.ug7ezy6.mongodb.net/p_devtinder")}
module.exports = connectdb