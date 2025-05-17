import express from "express";
import { getEmployees } from "../controllers/employeesController.js";

const router = express.Router();

router.route("/").get(getEmployees);

export default router;
