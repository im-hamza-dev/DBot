import { generateNaturalLanguageAnswer } from "../services/langchainservice.js";

export const generateQuery = async (req, res) => {
  try {
    const { queryStatement } = req.body;

    if (!queryStatement) {
      return res.status(400).json({ error: "No query statement provided." });
    }

    const answer = await generateNaturalLanguageAnswer(queryStatement);
    return res.status(200).json({ answer });
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
