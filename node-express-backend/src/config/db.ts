import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || null;

export const connectDB = async () => {
  try {
    if (MONGO_URI) {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB  => connection established');
    } else {
      console.log('Mongo connection URL error');
      throw new Error('Mongo connection URL error');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
