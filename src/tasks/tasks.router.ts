import { Router } from 'express';
import { taskController } from './tasks.controller';
import {
  createValidator,
  updateValidator,
} from './tasks.validator';

export const taskRouter = Router();

taskRouter.get('/', taskController.getAll);

taskRouter.post(
  '/',
  createValidator,
  taskController.createTask,
);

taskRouter.put(
  '/:id',
  updateValidator,
  taskController.updateTask,
);
