const express=require('express')
const route=express.Router()
const paymentmodel=require('../models/paymentmodel')
route.post('/pay', async (req,res)=>{
    try{
    const { amount, method, upiId, cardNumber, bankName, accountNumber } = req.body;
    const paymentData = { amount, method };
    if (method === "upi") paymentData.upiId = upiId;
    if (method === "card") paymentData.cardNumber = cardNumber;
    if (method === "netbanking") {
      paymentData.bankName = bankName;
      paymentData.accountNumber = accountNumber;
    }
    const result = await paymentmodel.create(paymentData);
    res.status(201).json({ message: "Payment data stored successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports=route