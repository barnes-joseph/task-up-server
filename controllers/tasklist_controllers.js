const db = require("../models");

// creating relationships
const TaskLists = db.tasklists;
const Tasks = db.tasks;

TaskLists.hasMany(Tasks);
Tasks.belongsTo(TaskLists);

// 1. create TaskList
const createTaskList = async (req, res) => {
  try {
    const data = req.body;
    await TaskLists.create(data);
    const tasklists = await TaskLists.findAll()
    return res
      .status(201)
      .json({ success: true, tasklist: tasklists.slice(tasklists.length-1)[0]});
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred in the server" });
  }
};

// 2. retrieve all TaskLists
const getAllTaskList = async (req, res) => {
  try {
    const tasklists = await TaskLists.findAll();
    return res.status(200).json({ success: true, tasklists: tasklists });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred in the server" });
  }
};

// 3. retrieve TaskList by id
const getTaskListById = async (req, res) => {
  try {
    const { task_list_id } = req.params;
    const tasklist = await TaskLists.findOne({ where: { id: task_list_id } });
    if (!tasklist) {
      return res
        .status(404)
        .json({ success: false, message: "Tasklist does not exist" });
    }
    const tasks = await Tasks.findAll({ where: { tasklistID: task_list_id } });
    return res
      .status(200)
      .json({ success: true, tasklist: { ...tasklist.dataValues, tasks: tasks } });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred in the server" });
  }
};

// 4. update TaskList by id
const updateTaskListById = async (req, res) => {
  try {
    const { task_list_id } = req.params;
    const tasklist = await TaskLists.findOne({ where: { id: task_list_id } });
    if (!tasklist) {
      return res
        .status(404)
        .json({ success: false, message: "Tasklist does not exist" });
    }
    await TaskLists.update(req.body, {
      where: { id: task_list_id },
    });
    return res
      .status(200)
      .json({ success: true, message: "TaskList updated successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred in the server" });
  }
};

// 5. delete TaskList by id
const deleteTaskListById = async (req, res) => {
  try {
    const { task_list_id } = req.params;
    const tasklist = await TaskLists.findOne({ where: { id: task_list_id } });
    if (!tasklist) {
      return res
        .status(404)
        .json({ success: false, message: "Tasklist does not exist" });
    }
    await TaskLists.destroy({
      where: { id: task_list_id },
    });
    return res
      .status(200)
      .json({ success: true, message: "TaskList deleted successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred in the server" });
  }
};

module.exports = {
  createTaskList,
  getAllTaskList,
  getTaskListById,
  updateTaskListById,
  deleteTaskListById,
};
