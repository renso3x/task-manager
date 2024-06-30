import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .trim()
    .isString()
    .withMessage('Title needs to be in text format'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('Date is required')
    .isString()
    .withMessage(
      'The date needs to be a valid date format',
    ),

  body('description')
    .trim()
    .isString()
    .withMessage('Description need to be in text format'),

  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.low, Priority.high])
    .withMessage(
      'Priority should be a valid Priority enum',
    ),

  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage('Status should be be a valid Status enum'),
];

export const updateValidator = [
  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage('Status should be be a valid Status enum'),
];
