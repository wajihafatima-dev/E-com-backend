import mongoose from "mongoose";

const connectDb = async () => {
    try {
      const db = await mongoose.connect(process.env.MONGO_URI);
      console.log('Database connected');
      return db;
    } catch (error) {
      console.error('Database connection error:', error.message);
      throw new Error('Database connection failed');
    }
  };
  
  export default connectDb;