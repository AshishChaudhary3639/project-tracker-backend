const mongoose=require('mongoose')


// Creating schema or structure of the every project
const projectSchema=new mongoose.Schema({
    projectName:{type:String,required:true},
    reason:{type:String,required:true},
    type:{type:String,required:true},
    division:{type:String,required:true},
    category:{type:String,required:true},
    priority:{type:String,required:true},
    department:{type:String,required:true},
    startDate:{type:String,required:true},
    endDate:{type:String,required:true},
    location:{type:String,required:true},
    status:{type:String,default:'registered'},
})

const ProjectModel=mongoose.model('project',projectSchema)

module.exports={ProjectModel}