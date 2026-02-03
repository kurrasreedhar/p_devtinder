const mongoose= require("mongoose")
const validator= require("validator")
const jwt = require("jsonwebtoken");
const bcrypt= require("bcrypt")

const userScheme=new mongoose.Schema({
    firstName:{
        type :String ,
        required:true,
        minLength:4,
        maxLength:12,
        trim:true,
    },
    lastName:{
        type :String ,
        required:true,
         minLength:4,
        maxLength:12,
        trim:true
    },
    emailId:{
        type :String ,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("error updating email"+ value)
            }
        }
    },
    age:{
        type :Number ,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("error updating gender"+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(" error updating password"+value)
            }
        }
    },
    bio:{
        type:String,
        default:"iam tinder user"
    },
    skills:{
           type:[String],
    },
    photoUrl:{
         type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("error updateing url"+value)
            }
        }
    }
},{timestamps:true})

userScheme.methods.getJWT= async function(){
    const user= this
    const token = await jwt.sign({_id:user.id},"Dev@tinder1",{ expiresIn : '1d' })
    return token
}

userScheme.methods.validatePassword = async function(passwordinputgibvenbyuser){
    const user= this
    const match= await bcrypt.compare(passwordinputgibvenbyuser ,user.password)
    return match

}



module.exports=mongoose.model("user",userScheme)
