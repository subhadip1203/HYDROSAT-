import { FeedbackModel, IFeedback } from '../models/Feedback';

export const createFeedback = async (data: {
  name: string;
  email: string;
  text: string;
}): Promise<IFeedback> => {
  try {
    return await FeedbackModel.create(data);
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw new Error('Failed to create feedback');
  }
};

export const updateSentiment = async (data: {
  id: string,
  sentiment: 'Good' | 'Bad' | 'Neutral'
}): Promise<boolean> => {
  try {
    const result = await FeedbackModel.findByIdAndUpdate(data.id, { sentiment: data.sentiment });
    return result !== null; // Return true if the document was found and updated, otherwise false
  } catch (error) {
    console.error(`Error updating sentiment for ID ${data.id}:`, error);
    return false; // Return false in case of an error
  }
};

export const getAllFeedback = async (): Promise<IFeedback[]> => {
  try {
    return await FeedbackModel.find().sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error('Error retrieving all feedback:', error);
    throw new Error('Failed to retrieve feedback');
  }
};

export const getFeedbackById = async (id: string): Promise<IFeedback | null> => {
  try {
    return await FeedbackModel.findById(id);
  } catch (error) {
    console.error(`Error retrieving feedback with ID ${id}:`, error);
    throw new Error('Failed to retrieve feedback');
  }
};
