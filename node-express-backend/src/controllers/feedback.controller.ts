import { Request, Response } from 'express';
import { createFeedback } from '../services/feedback.service';
import { publishFeedback } from '../RabbitMQ/publisher/feedbackToPython';

export const submitFeedbackController = async (req: Request, res: Response) => {
  try {

    const saved = await createFeedback(req.body) as { _id: any; text: string };
    const id = saved._id.toString()
    console.log('Feedback payload:', { id: id, text: saved.text });
    await publishFeedback({ id: id, text: saved.text });

    return res.status(200).json({
      message: 'Feedback received successfully',
      id: id,
    });
  } catch (error) {
    console.error('Feedback submission failed:', error);
    return res.status(500).json({
      message: 'Failed to submit feedback',
    });
  }
};
