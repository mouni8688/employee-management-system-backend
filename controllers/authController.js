
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//register
exports.register=async (req,res) =>{
    try{
        const{name,email,password,role}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:"user Already Exists try log in"});
        }
        //hashing password
        const hashedPassword=await bcrypt.hash(password,10);

        //creating user
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role:role || "employee"
        });
        res.status(200).json({msg:"User Created Sucessfully",user});
    }catch(err){
        return res.status(500).json({msg:err.message});
    }
}


//login
exports.login=async (req,res)=>{
    try{
        const{email,password}=req.body;

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"user Not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials"});
        }

        const token=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        res.json({msg:"login Sucessfully",token});
    }catch(err){
        return res.status(400).json({msg:err.message});
    }
}