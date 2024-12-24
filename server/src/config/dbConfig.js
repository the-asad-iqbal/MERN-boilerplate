import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error("MongoURI is not defined in .env file");
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB 🔗: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
