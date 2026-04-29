const express=require("express");
const router=express.Router();

const auth=require("../middleware/authMiddleware");
const isAdmin=require("../middleware/roleMiddleware");

const{addFeedback,getAllFeedback}=require("../controllers/feedbackController");

router.post("/add",auth,addFeedback);
router.get("/get-all",auth,isAdmin,getAllFeedback);
module.exports=router;