// controllers/tokenUsageController.js
import connectMongo from "../db/mongodb.js";
import { TokenUsage } from "../models/tokenUsage.js";

export const logTokenUsage = async ({
  userId,
  question,
  sqlQuery,
  output,
  tokensUsed,
}) => {
  await connectMongo();

  const usage = new TokenUsage({
    userId: userId || "anonymous",
    question,
    sqlQuery,
    output,
    tokensUsed,
  });

  await usage.save();
};
