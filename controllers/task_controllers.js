const db = require("../models")

const Tasks = db.tasks
const TaskLists = db.tasklists

// 1. retrieve all tasks
const getAllTasks = async (req,res) => {
    try{
        const tasks = await Tasks.findAll()
        return res.status(200).json({success:true,tasks:tasks})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"An error occurred in the server"})
    }
}

// 2. retrieve task by id
const getTaskById  = async (req,res) => {
    try{
        const {task_id} = req.params
        const task = await Tasks.findOne({where:{id:task_id}})
        if(!task){
            return res.status(404).json({success:false,message:"Task does not exist"})
        }
        return res.status(200).json({success:true,task:task})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"An error occurred in the server"})
    }
}

// 3. retrieve tasks by tasklist id
const getTasksByTaskListId = async (req,res) => {
    try{
        const {task_list_id} = req.params
        const tasks = await Tasks.findAll({where:{tasklistId:task_list_id}})
        return res.status(200).json({success:true,tasks:tasks})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"An error occurred in the server"})
    }
}

// 4. create Task
const createTask = async (req,res) => {
    try{
        const {task_list_id} = req.params
        const tasklist = await TaskLists.findOne({where:{id:task_list_id}})
        if(!tasklist){
            return res.status(404).json({success:false,message:"Task List not found"})
        }
        await Tasks.create({...req.body,tasklistId:task_list_id})
        const task = await Tasks.findAll({where:{tasklistId:task_list_id}})
        return res.status(201).json({success:true,task:task.slice(task.length-1)[0]})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"An error occured in the server"})
    }
}

// 5. update task by id
const updateTaskById = async (req,res) => {
    try{
        const {task_list_id,task_id} = req.params
        const task = await Tasks.update(req.body,{where:{id:task_id}})
        const tasks = await Tasks.findAll({where:{tasklistId:task_list_id}})
        const completed = tasks.reduce((prevTask,currTask)=>{
            if(currTask.complete === true){
                return prevTask += 1
            }
            return prevTask
        },0)
        console.log(completed)
        await TaskLists.update({completed:completed},{where:{id:task_list_id}})
        const updated_task = await Tasks.findOne({where:{id:task_id}})
        return res.status(200).json({success:true,task:updated_task,completed_tasks:completed, message:"Task updated successfully"})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"An error occurred in the server"})
    }
}

// 6. delete tasks
const deleteTaskById = async (req,res) => {
    try{
        const {task_id} = req.params
        await Tasks.destroy({where:{id:task_id}})
        return res.status(200).json({success:true,message:"Task deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"An error occurred in the server"})
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    getTasksByTaskListId,
    createTask,
    deleteTaskById,
    updateTaskById
}

