import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error(`Error connecting DB`, error);
        process.exit(1); //1 means failure.
      }
};
