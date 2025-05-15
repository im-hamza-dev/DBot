"use client";
import React, { useState } from "react";
import styles from "./query-flow.module.scss";

const QueryFlow = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("http://localhost:3000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queryStatement: query }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Adjust this depending on your backend response structure
      setResult(JSON.stringify(data.result, null, 2));
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.sqlApp}>
      <div className={styles.headerBadge}>🧠 Smart SQL Interface</div>
      <h1 className={styles.heading}>
        Execute SQL queries <br /> in seconds
      </h1>
      <p className={styles.subheading}>
        Run queries directly from your browser. Fast, powerful, and easy to use.
      </p>

      <form className={styles.queryForm} onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Write your SQL query here..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Running..." : "Run Query"}
        </button>
      </form>

      {error && <div className={styles.errorMsg}>❌ {error}</div>}

      {result && (
        <div className={styles.resultBox}>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default QueryFlow;
