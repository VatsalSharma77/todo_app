const express = require("express");
const router = express.Router();
const Task = require("../modals/task");
const User = require("../modals/user");
const auth = require("../middleware/auth");

router.post("/create-task", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.headers;
    const newTask = new Task({
      title: title,
      description: description,
    });
    const savedTask = await newTask.save();
    const taskId = savedTask._id;
    await User.findByIdAndUpdate(id, {
      $push: { tasks: taskId._id },
    });

    res
      .status(200)
      .json({ message: "Task created successfully", data: savedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-tasks", auth, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res
      .status(200)
      .json({ message: "Tasks fetched successfully", data: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-task/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    const userData = await User.findByIdAndUpdate(userId, {
      $pull: { tasks: id },
    });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update-task/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update-imp-task/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const ImpTask = TaskData.important;
    await Task.findByIdAndUpdate(id, {
      important: !ImpTask,
    });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update-complete-task/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const completeTask = TaskData.complete;
    await Task.findByIdAndUpdate(id, {
      complete: !completeTask,
    });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-imp-tasks", auth, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });

    const ImpTaskData = Data.tasks;
    res
      .status(200)
      .json({ message: "Tasks fetched successfully", data: ImpTaskData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-complete-tasks", auth, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });

    const completeTaskData = Data.tasks;
    res
      .status(200)
      .json({ message: "Tasks fetched successfully", data: completeTaskData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-incomplete-tasks", auth, async (req, res) => {
    try {
      const { id } = req.headers;
      const Data = await User.findById(id).populate({
        path: "tasks",
        match: { complete: false },
        options: { sort: { createdAt: -1 } },
      });
  
      const IncompleteTaskData = Data.tasks;
      res
        .status(200)
        .json({ message: "Tasks fetched successfully", data: IncompleteTaskData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
