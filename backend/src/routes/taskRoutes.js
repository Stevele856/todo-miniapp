import express from 'express'
import { createTasks, deleteTasks, getAlltasks, updatedTasks } from '../controller/taskController.js'

const router = express.Router()

// READ API
router.get('/', getAlltasks)

// POST APT
router.post('/', createTasks)

// PUT API
router.put('/:id', updatedTasks)

// DELETE API
router.delete('/:id', deleteTasks)

export default router