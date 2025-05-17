import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import queryRoutes from "./routes/queryRoutes.js";
import employeesRoutes from "./routes/employeesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/query", queryRoutes);
app.use("/api/employees", employeesRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
