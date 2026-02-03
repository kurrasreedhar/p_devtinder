const mongoose=require("mongoose")
const connectdb=async()=>{
    await mongoose.connect("mongodb+srv://vijaysnodeproject:qhLFuzAldAdRWYFD@vijaysnodeproject.ug7ezy6.mongodb.net/p_devtinder")
}
module.exports = connectdb