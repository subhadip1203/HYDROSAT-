import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateSentiment = [
  body('id')
    .trim()
    .notEmpty().withMessage('ID is required')
    .isMongoId().withMessage('ID must be a valid MongoDB ObjectId'),

  body('sentiment')
    .isString().withMessage('Sentiment must be a string')
    .isIn(['Good', 'Bad', 'Neutral']).withMessage('Sentiment must be one of Good, Bad, or Neutral'),

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