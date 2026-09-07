import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    process.exit(1);

// process.exit(1) means "terminate the Node.js process with a failure status."

// Think of it like this:

// process.exit(0)  →  Success ✅
// process.exit(1)  →  Failure ❌
// Why 1?

// Operating systems use an exit status code to know how a program ended.

// 0 → program finished successfully
// Non-zero (commonly 1) → something went wrong
  }
};

export default connectDB;