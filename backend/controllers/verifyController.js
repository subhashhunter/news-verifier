import express from 'express'
import verifyText from '../services/verifier.js';

export const verifyHandler =async(req,res)=>{
    try {
      const {text}=req.body
       if (!text)
    {
      return res.status(400).json({ error: "Text is required" });
    }

    const result = await verifyText(text);
    console.log(result)
    res.json(result);  
    } catch (error) {
        console.log(error)
    }
}