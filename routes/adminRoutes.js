const express=require("express");
const router=express.Router();

const auth=require("../middleware/authMiddleware");
const isAdmin=require("../middleware/roleMiddleware");

//admin Routes
router.get("/dashboard",auth,isAdmin,(req,res)=>{
    res.json({msg:"Welcome Admin"});
});

module.exports=router;