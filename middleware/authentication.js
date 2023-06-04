const jwt=require('jsonwebtoken')
require('dotenv').config()
const authentication=(req,res,next)=>{
    let token=req.headers.authorization.split(' ')[1]

    jwt.verify(token,process.env.SCRET_KEY,(err,decode)=>{ // verifying that token is valid or not
        if(decode){
            let email=decode.email
            if(email){
                next()
            }
        }else{
            res.send({'err':'login again'})
        }
    })
}
module.exports={authentication}