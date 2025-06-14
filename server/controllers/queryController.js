import { generateNaturalLanguageAnswer } from "../services/langchainservice.js";
import { logTokenUsage } from "./tokenUsageController.js";

export const generateQuery = async (req, res) => {
  try {
    const { queryStatement } = req.body;

    if (!queryStatement) {
      return res.status(400).json({ error: "No query statement provided." });
    }

    const answer = await generateNaturalLanguageAnswer(queryStatement);
    await logTokenUsage({
      userId: "some-user-id", // placeholder, update after auth integration
      question: queryStatement,
      sqlQuery: answer.query,
      output: answer.result,
      tokensUsed: answer.usage,
    });
    return res.status(200).json({
      result: answer.result,
      query: answer.query,
      employees: answer.employees,
      usage: answer.usage,
    });
  } catch (err) {
    console.error("Error in /query:", err.message);
    if (err.message.includes("quota")) {
      return res
        .status(429)
        .json({ error: "Quota exceeded. Try again later.", detail: err });
    }
    return res
      .status(500)
      .json({ error: "Server error while generating query." });
  }
};
