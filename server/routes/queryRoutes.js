import express from "express";
import { generateQuery } from "../controllers/queryController.js";

const router = express.Router();

router.route("/").post(generateQuery);

export default router;
