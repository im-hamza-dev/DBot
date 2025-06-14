import mongoose from "mongoose";

const TokenUsageSchema = new mongoose.Schema({
  userId: { type: String, default: "anonymous" },
  question: String,
  sqlQuery: String,
  output: String,
  tokensUsed: Number,
  createdAt: { type: Date, default: Date.now },
});

export const TokenUsage =
  mongoose.models.TokenUsage || mongoose.model("TokenUsage", TokenUsageSchema);
