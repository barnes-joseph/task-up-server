const express = require('express')
const {getAllTasks,getTaskById,getTasksByTaskListId,createTask,updateTaskById,deleteTaskById} = require('../controllers/task_controllers')

const router = express.Router()

router.get('/',getAllTasks)
router.get('/tasklist/:task_list_id',getTasksByTaskListId)

router.post('/:task_list_id',createTask)
router.get('/:task_id',getTaskById)
router.put('/:task_id/tasklist/:task_list_id',updateTaskById)
router.delete('/:task_id',deleteTaskById)

module.exports = router

