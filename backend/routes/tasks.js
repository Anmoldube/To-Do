import { Router } from 'express';
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} from '../controllers/taskController.js';

const router = Router();

router.get('/', listTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;