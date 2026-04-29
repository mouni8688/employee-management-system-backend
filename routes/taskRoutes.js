const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");
const { assignTask,getMyTasks ,updateTask} = require("../controllers/taskController");

router.post("/assign", auth, isAdmin, assignTask);
router.get("/my-tasks",auth,getMyTasks);
router.put("/update-task/:id",auth,updateTask);
module.exports = router;