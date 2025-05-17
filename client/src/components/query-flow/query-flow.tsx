"use client";
import React, { useEffect, useState } from "react";
import styles from "./query-flow.module.scss";
import { CustomTable } from "../custom-table/CustomTable";
import { get } from "@/api/axiosinstance";

const QueryFlow = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [employees, setEmployees] = useState<any>(null);
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
  useEffect(() => {
    get("/api/employees")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columnsEmployees = [
    { key: "EmployeeId" },
    { key: "FirstName" },
    { key: "LastName" },
    { key: "Title" },
    { key: "Address" },
    {
      key: "ReportsTo",
      render: (row: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {employees
            ? employees?.find((emp: any) => emp.EmployeeId === row.ReportsTo)
                ?.FirstName
            : ""}
        </div>
      ),
    },
    { key: "Country" },
    { key: "Phone" },
  ];

  return (
    <div className={styles.sqlApp}>
      <div className={styles.headerBadge}>🧠 Smart SQL Interface</div>
      <h1 className={styles.heading}>Execute SQL queries in seconds</h1>
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
      <div className={styles.flexResults}>
        <div className={styles.resultBox}>
          <pre>{result}</pre>
        </div>

        <div className={styles.employeesTableWrapper}>
          <CustomTable data={employees || []} columns={columnsEmployees} />
        </div>
      </div>
    </div>
  );
};

export default QueryFlow;
