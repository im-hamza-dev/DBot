// src/app/login/page.tsx
"use client";

import React, { useState } from "react";
import styles from "./login.module.scss";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const { token, user } = await res.json();
    if (res.ok) {
      login(token, user);
    } else {
      const { error } = await res.json();
      setError(error || "Login failed");
    }
  };

  return (
    <div className={styles.authWrapper}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
