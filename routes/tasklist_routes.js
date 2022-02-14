const express = require('express')

const router = express.Router()

const {createTaskList,getAllTaskList,getTaskListById,updateTaskListById,deleteTaskListById} = require('../controllers/tasklist_controllers')

router.post('/',createTaskList)

router.get('/',getAllTaskList)


router.get('/:task_list_id',getTaskListById)

router.put('/:task_list_id',updateTaskListById)

router.delete('/:task_list_id',deleteTaskListById)

module.exports = router