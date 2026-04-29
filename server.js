const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');

//routes
const taskRoutes=require("./routes/taskRoutes");
const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
const adminRoutes=require("./routes/adminRoutes");
const feedbackRoutes=require("./routes/feedbackRoutes");

//injecting env
dotenv.config();

//defining app
const port=5000;
const app=express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/feedback",feedbackRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.get("/",(req,res)=>{
    console.log("App is working fine");
});

//conecting mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb Connected Sucessfully");
}).catch((err)=>{
    console.log(err);
});


//firing app
app.listen(port,()=>{
    console.log(`Server running Sucessfully on port : ${port}`);
});