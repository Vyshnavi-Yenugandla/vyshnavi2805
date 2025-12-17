const express=require('express')
const route=express.Router()
const usermodel=require('../models/usermodel')
route.post('/login',async (req,res)=>{
    try{
        const {
            name,password
        }=req.body;
        const result= await usermodel.find({
            name,password
        })
        if(result){
            return res.status(210).json({message : "User found"})
        }
        else{
            return res.status(407).json({message:"Not found"})
        }
    }
   catch(err){
        console.log(err);
   }
}
)
route.post('/signup',async (req,res)=>{
    try{
        const {
            name,email,password
        }=req.body;
        const result= await usermodel.create({
            name,email,password
        })
        if(result){
            return res.status(210).json({message : "User Created"})
        }
        else{
            return res.status(407).json({message:"Not created"})
        }
    }
   catch(err){
        console.log(err);
   }
}
)
module.exports=route