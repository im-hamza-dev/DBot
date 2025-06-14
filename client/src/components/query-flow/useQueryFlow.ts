import { useEffect, useState, FormEvent } from "react";
import { get } from "@/api/axiosinstance";
import { Employee, QueryResponse } from "./types";

export const useQueryFlow = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await get("/api/employees");
      setEmployees(response.data || []);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryStatement: query }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data: QueryResponse = await response.json();

      setResult(
        `Generated SQL Query:\n${data.query}\n\nResult:\n${JSON.stringify(
          data.result,
          null,
          2
        )}`
      );

      const parsedEmployees: Employee[] = JSON.parse(data.employees || "[]");
      setEmployees(parsedEmployees);

      console.log("Tokens used:", data.usage);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    query,
    setQuery,
    result,
    loading,
    error,
    employees,
    handleSubmit,
  };
};
