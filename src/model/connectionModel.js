const mongoose= require("mongoose")

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    },
    toUserId:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"user",
    },
    status: {
        type:"String",

        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not in status type`
        }
    }
}) 
connectionRequestSchema.pre("save",function(next){
    const connectionRequest= this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("connot send request to same userid")
    }
    next()

})

module.exports= mongoose.model("connectionRequest",connectionRequestSchema)