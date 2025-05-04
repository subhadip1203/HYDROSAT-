import { Request, Response } from 'express';
import { updateSentiment } from '../services/feedback.service';

export const updateSentimentController = async (req: Request, res: Response) => {
  try {
    const status = await updateSentiment(req.body)
    if (!status) {
      return res.status(404).json({
        message: 'Feedback not found',
      });
    }
    return res.status(200).json({
      message: 'Feedback received successfully',
    });
  } catch (error) {
    console.error('sentiment update failed:', error);
    return res.status(500).json({
      message: 'Failed to update sentiment value',
    });
  }
}