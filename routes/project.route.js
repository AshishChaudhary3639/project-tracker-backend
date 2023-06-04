const {Router} =require('express');
const { authentication } = require('../middleware/authentication');
const { ProjectModel } = require('../models/project.model');

const projectRoute=Router()

// Project data storing into Database
projectRoute.post('/createproject',authentication,async(req,res)=>{
    let project=req.body;
    try {
        let data=new ProjectModel(project)
        await data.save()
        res.send({'success':'project add successfuly'})
    } catch (error) {
        res.send({'err':'something went wrong'})
        
    }
})

projectRoute.get('/getprojects',authentication,async(req,res)=>{
    const page=req.query.page    
    try {
        let projects = await ProjectModel.find().skip(page*10).limit(10)
        res.send(projects)
    } catch (error) {
        res.send({'err':'something went wrong'})
        
    }
})

projectRoute.patch('/getprojects/:id',authentication,async(req,res)=>{
    const id=req.params.id
    const valueToUpdate=req.body.status
    const page=Number(req.body.page)
    try {
        await ProjectModel.findByIdAndUpdate(id,{"status":valueToUpdate})
        let projects = await ProjectModel.find().skip(page*10).limit(10)
        res.send(projects)
    } catch (error) {
        console.log(error)
        res.send({'err':'something went wrong'})
        
    }
})


projectRoute.get('/search',authentication,async(req,res)=>{
    const val=req.query.query
    try {
        let projects = await ProjectModel.find({
            $or:[
                {"projectName":{ $regex: val, $options: "i" }},
                {"type":{ $regex: val, $options: "i" }},
                {"division":{ $regex: val, $options: "i" }},
                {"category":{ $regex: val, $options: "i" }},
                {"priority":{ $regex: val, $options: "i" }},
                {"location":{ $regex: val, $options: "i" }},
            ]
        })
        res.send(projects)
    } catch (error) {
        res.send({'err':'something went wrong'})
        
    }
})
module.exports={projectRoute}