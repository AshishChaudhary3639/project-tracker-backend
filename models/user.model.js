const mongoose=require('mongoose')


// Creating schema or structure of the every user
const useSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const UserModel=mongoose.model('users',useSchema)

module.exports={UserModel}