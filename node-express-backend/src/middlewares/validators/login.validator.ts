import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateAuthLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6, max: 8 }).withMessage('Password must be between 6 and 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one special character'),

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