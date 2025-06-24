import express from "express";
import connectMongo from "../db/mongodb.js";
import { TokenUsage } from "../models/tokenUsage.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await connectMongo();
  const usage = await TokenUsage.find({}).sort({ createdAt: -1 }).limit(50);
  res.json(usage);
});

export default router;
