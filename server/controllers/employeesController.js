import { initDatabase } from "../services/langchainservice.js";

export const getEmployees = async (req, res) => {
  try {
    const db = await initDatabase();
    const employees = await db.run("SELECT * FROM Employee");
    const parsedResult =
      typeof employees === "string" ? JSON.parse(employees) : employees;

    return res
      .status(200)
      .json({ data: parsedResult, length: parsedResult.length });
  } catch (err) {
    console.error("Error in /query:", err.message);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
