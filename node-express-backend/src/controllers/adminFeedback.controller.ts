import { Request, Response } from 'express';
import { getAllFeedback } from '../services/feedback.service';


export const adminFeedbackController = async (req: Request, res: Response) => {
    try {
        const feedbacks = (await getAllFeedback()).map((v: { _id: any; __v?: any; id?: string }) => {
            v.id = v._id.toString();
            delete v._id;
            delete v.__v;
            return v;
        });

        return res.status(200).json({
            data: feedbacks
        });
    }
    catch (error) {
        console.error('Login failed:', error);
        return res.status(500).json({
            message: 'Login failed',
        });
    }
}