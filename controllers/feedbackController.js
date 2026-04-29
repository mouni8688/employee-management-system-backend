const Feedback = require("../models/Feedback");

exports.addFeedback = async (req, res) => {
    try {
        const { taskId, message } = req.body;
        const feedback = await Feedback.create({
            task: taskId,
            employee: req.user.id,
            message
        });
        res.status(201).json({ msg: "Feedback submited" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

exports.getAllFeedback=async (req,res)=>{
    try{
        const feedbacks=await Feedback.find()
        .populate("employee","name email")
        .populate("task","title");

        res.json({feedbacks});
    }catch(err){
        return res.status(500).json({msg:err.message});
    }
}