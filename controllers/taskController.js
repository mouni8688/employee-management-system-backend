const Task=require("../models/Task");
exports.assignTask=async (req,res)=>{
    try{
        const{title,description,assignedTo}=req.body;
        const task=await Task.create({
            title,
            description,
            assignedTo
        });
        res.status(201).json({msg:"Task Assinged Sucessfully",task});
    }catch(err){
        return res.status(500).json({msg:err.message});
    }
}


exports.getMyTasks=async (req,res)=>{
    try{
        const tasks=await Task.find({
            assignedTo:req.user.id
        });
        res.json({
            msg:"My Tasks",
            tasks
        });
    }catch(err){
        return res.status(500).json({msg:err.msg});
    }
}

exports.updateTask=async (req,res)=>{
    try{
        const {status}=req.body;
        const task=await Task.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true}
        );
        res.json({
            msg:"task Updates Sucessfully",
            task
        });
    }catch(err){
        return res.status(500).json({msg:err.message});
    }
}
