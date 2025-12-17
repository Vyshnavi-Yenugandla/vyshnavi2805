const express=require('express')
const route=express.Router()
const dashboardmodel=require('../models/dashboard')
route.get('/dash', async (req, res) => {
    try {
        // Try to get the most recent data, fallback to any data if no timestamps
        let data = await dashboardmodel.findOne().sort({ createdAt: -1 });
        if (!data) {
            data = await dashboardmodel.findOne();
        }
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
route.post('/dash',async (req,res)=>{
    try{
        const {
            name,email,gender,age,dob,address
        }=req.body;
        const result= await dashboardmodel.create({
            name,email,gender,age,dob,address
        })
        if(result){
            return res.status(210).json({message : "Dashboard Created"})
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
