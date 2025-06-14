import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import queryRoutes from "./routes/queryRoutes.js";
import employeesRoutes from "./routes/employeesRoutes.js";
import tokenUsageRoutes from "./routes/tokenUsage.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/query", queryRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/token-usage", tokenUsageRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
