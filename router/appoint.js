const express=require('express')
const route=express.Router()
const appointment=require('../models/appointment')

route.get('/appoint', async (req, res) => {
    try {
        const appointments = await appointment.find().sort({ createdAt: -1 });
        if (appointments && appointments.length > 0) {
            return res.status(200).json(appointments);
        } else {
            return res.status(404).json({ message: "No appointments found." });
        }
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

route.post('/appoint',async (req,res)=>{
    try{
        const {
            appointmentType,appointmentDate,appointmentTime
        }=req.body
        const result= await appointment.create({
            type: appointmentType,
            date: appointmentDate,
            time: appointmentTime
        })
        if(result){
            return res.status(201).json({message: "Appointment details are stored"})
        }
        else{
            return res.status(405).json({message:"Appointment details are not stored"})
        }
    }
    catch(err){
        console.log(err)
    }
    
})

module.exports=route