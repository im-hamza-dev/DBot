// utils/db.js
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectMongo = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_DB_API_KEY || "", {
      dbName: "your-db-name",
    });
  }
};

export default connectMongo;
