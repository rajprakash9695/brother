import mongoose from 'mongoose';

export async function ConnectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB is connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
