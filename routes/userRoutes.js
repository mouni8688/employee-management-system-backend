const express=require("express");
const router=express.Router();
const auth=require("../middleware/authMiddleware");

//apis
router.get("/profile",auth,(req,res)=>{
    res.json({
        msg:"profile data get Fetched",
        user:req.user
    });
});

module.exports=router;