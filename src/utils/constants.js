const validator= require("validator")

const Validation=(req)=>{
    const {firstName, lastName,emailId,password}= req.body
    if(!firstName||!lastName){
        throw new Error("name is not valid")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not valid")
    }
}

const validatefieldsdata=(req,res)=>{
const Allowedfields=["firstName","lastName","age","bio","gender","photoUrl","skills"]
const value= Object.keys(req.body).every(key=>Allowedfields.includes(key))
return value
}

module.exports={validatefieldsdata,Validation}