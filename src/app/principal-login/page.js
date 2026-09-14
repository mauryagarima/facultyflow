"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./principal-login.css";

export default function PrincipalLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Fixed Principal Credentials
    const correctEmail = "principal@facultyflow.com";
    const correctPassword = "Principal@123";
    const correctAccessCode = "FF2026";

    if (
      email === correctEmail &&
      password === correctPassword &&
      accessCode === correctAccessCode
    ) {
      setError("");
      router.push("/dashboard");
    } else {
      setError(
        "Invalid email, password, or principal access code."
      );
    }
  };

  return (
    <main className="principal-login-page">
      <div className="principal-login-container">

        <Link href="/role-selection" className="back-button">
          ← Back
        </Link>

        <div className="login-card">

          <div className="login-icon">👨‍💼</div>

          <h1>Principal Login</h1>

          <p className="subtitle">
            Login to manage faculty and monitor their work.
          </p>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="input-group">
              <label>Official Email</label>

              <input
                type="email"
                placeholder="Enter your official email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Access Code */}
            <div className="input-group">
              <label>Principal Access Code</label>

              <input
                type="text"
                placeholder="Enter principal access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                {error}
              </p>
            )}

            <button type="submit" className="login-button">
              Login as Principal
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}