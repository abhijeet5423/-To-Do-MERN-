import mongoose from "mongoose";

const connectDB = async (uri?: string) => {
  const mongoUri = uri || process.env.MONGO_URI!;
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};

export default connectDB;
