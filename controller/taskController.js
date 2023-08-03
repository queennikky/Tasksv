const Task = require("../models/task");

//get all task
const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.json(error);
  }
};
//get a single task
const getTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById({ _id: taskId });
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.json(error);
  }
};
//create task
const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the input fields" });
  }
  try {
    const task = await Task.create({ ...req.body });
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.json(error);
  }
};

//update a task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.json(error);
  }
};
//delete a task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const goal = await Task.findByIdAndDelete({ _id: taskId });
    res.status(200).json({ success: true });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
