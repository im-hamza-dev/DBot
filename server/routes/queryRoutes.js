import express from "express";
import { generateQuery } from "../controllers/queryController.js";

const router = express.Router();

router.route("/").get(generateQuery);

export default router;
