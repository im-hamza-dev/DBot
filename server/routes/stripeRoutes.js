import express from "express";
import connectMongo from "../db/mongodb.js";
import { stripeCheckout } from "../controllers/stripeCheckout.js";

const router = express.Router();

router.route("/create-intent").post(stripeCheckout);

export default router;
