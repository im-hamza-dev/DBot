"use client";
import React from "react";
import styles from "./query-flow.module.scss";
import { CustomTable } from "../custom-table/CustomTable";
import { useQueryFlow } from "./useQueryFlow";
import TokensUsage from "../tokens-usage/tokens-usage";

const QueryFlow: React.FC = () => {
  const { query, setQuery, result, loading, error, employees, handleSubmit } =
    useQueryFlow();

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
      <TokensUsage />
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
