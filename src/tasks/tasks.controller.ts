import { UpdateResult } from 'typeorm';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

class TaskController {
  public async getAll(req: Request, res: Response) {
    try {
      const allTasks = await AppDataSource.getRepository(
        Task,
      ).find();
      const plainTasks = instanceToPlain(
        allTasks,
      ) as Task[];
      return res.json(plainTasks).status(200);
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  public async createTask(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const newTask = new Task();
    newTask.title = req.body.title;
    newTask.description = req.body.description;
    newTask.date = req.body.date;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      return res.json(createdTask).status(201);
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  public async updateTask(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    try {
      const task = await AppDataSource.getRepository(
        Task,
      ).findOne({
        where: {
          id: req.params.id,
        },
      });
      3;

      if (!task) {
        return res.status(404).json({
          error: 'Task with given id does not exist',
        });
      }

      let updatedTask: UpdateResult;

      updatedTask = await AppDataSource.getRepository(
        Task,
      ).update(
        req.params.id,
        plainToInstance(Task, {
          status: req.body.status,
          priority: req.body.priority,
        }),
      );

      updatedTask = instanceToPlain(
        updatedTask,
      ) as UpdateResult;
      return res.json(updatedTask).status(200);
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }
}

export const taskController = new TaskController();
