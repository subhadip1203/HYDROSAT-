import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  name: string;
  email: string;
  text: string;
  sentiment?: 'Good' | 'Bad' | 'Neutral' | null;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true },
    text: { type: String, required: true, maxlength: 1000 },
    sentiment: { type: String, enum: ['Good', 'Bad', 'Neutral'], default: null },
  },
  { timestamps: true }
);

export const FeedbackModel = mongoose.model<IFeedback>('Feedback', FeedbackSchema);
