import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (e) {
    console.log("Failed to connect to MongoDB");
  }
};

export default connectToMongoDB;