import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import queryRoutes from "./routes/queryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/query", queryRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
