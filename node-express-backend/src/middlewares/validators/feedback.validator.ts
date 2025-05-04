import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateFeedback = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name too long'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('text')
    .isString().withMessage('Text must be a string')
    .isLength({ min: 1, max: 1000 }).withMessage('Text must be between 1 and 1000 characters'),


    
  // inline middleware handler
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation error',
        errors: errors.array(),
      });
    }
    next();
  }
];
