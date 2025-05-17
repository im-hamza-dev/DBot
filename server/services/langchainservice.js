import { DataSource } from "typeorm";
import { SqlDatabase } from "langchain/sql_db";
import { ChatOpenAI } from "@langchain/openai";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";

dotenv.config();

// Load & validate config
const openaiApiKey = process.env.OPENAI_API_KEY;
const modelName = process.env.MODEL_NAME || "gpt-3.5-turbo";
if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY not set in environment");
}

// Setup once
const datasource = new DataSource({
  type: "sqlite",
  database: "employees.db",
});

let db;

export async function initDatabase() {
  if (!db) {
    db = await SqlDatabase.fromDataSourceParams({
      appDataSource: datasource,
    });
  }
  return db;
}
db = await initDatabase();

const model = new ChatOpenAI({
  openaiApiKey,
  modelName,
  maxTokens: 128,
});

const sqlPrompt = PromptTemplate.fromTemplate(
  `Based on the table schema below, write a SQL query that would answer the user's question. Return just the SQL and nothing else:
{schema}

Question: {question}
SQL Query:`
);

const finalPrompt = PromptTemplate.fromTemplate(
  `Based on the table schema below, question, sql query, and sql response, write a natural language response:
{schema}

Question: {question}
SQL Query: {query}
SQL Response: {response}`
);

const sqlQueryGeneratorChain = RunnableSequence.from([
  RunnablePassthrough.assign({
    schema: async () => db.getTableInfo(),
  }),
  sqlPrompt,
  model.bind({ stop: ["\nSQLResult:"] }),
  new StringOutputParser(),
]);

const fullChain = RunnableSequence.from([
  RunnablePassthrough.assign({
    query: sqlQueryGeneratorChain,
  }),
  {
    schema: async () => db.getTableInfo(),
    question: (input) => input.question,
    query: (input) => input.query,
    response: (input) => db.run(input.query),
  },
  finalPrompt,
  model,
]);

export const generateNaturalLanguageAnswer = async (question) => {
  let res = await db.getTableInfo();
  console.log(res, "--------------");
  try {
    const finalResponse = await fullChain.invoke({
      question: question.endsWith("?") ? question : `${question}?`,
    });

    return finalResponse.content;
  } catch (error) {
    console.error("LangChain processing failed:", error.message, error);
    throw error;
  }
};
