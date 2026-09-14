
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

  const [showPassword, setShowPassword] = useState(false);
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    // Fixed Principal Credentials
    const correctEmail = "principal@facultyflow.com";
    const correctPassword = "Principal@123";
    const correctAccessCode = "FF2026";

    if (
      email === correctEmail &&
      password === correctPassword &&
      accessCode === correctAccessCode
    ) {
      router.push("/dashboard");
    } else {
      setTimeout(() => {
        setLoading(false);
        setError(
          "Invalid email, password, or principal access code."
        );
      }, 500);
    }
  };

  return (
    <main className="principal-login-page">

      {/* Background Decorations */}
      <div className="login-blob login-blob-one"></div>
      <div className="login-blob login-blob-two"></div>

      <div className="principal-login-container">

        {/* Back Button */}
        <Link href="/role-selection" className="back-button">
          <span>←</span> Back to Roles
        </Link>

        {/* Login Card */}
        <div className="login-card">

          {/* Brand */}
          <div className="brand-section">
            <div className="login-icon">
              👨‍💼
            </div>

            <div className="brand-name">
              Faculty<span>Flow</span>
            </div>
          </div>

          <h1>Principal Login</h1>

          <p className="subtitle">
            Welcome back! Login to manage faculty and monitor
            academic activities.
          </p>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="input-group">
              <label>Official Email</label>

              <div className="input-wrapper">
                <span className="input-icon">✉️</span>

                <input
                  type="email"
                  placeholder="Enter your official email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Show or hide password"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Access Code */}
            <div className="input-group">
              <label>Principal Access Code</label>

              <div className="input-wrapper">
                <span className="input-icon">🔑</span>

                <input
                  type={showAccessCode ? "text" : "password"}
                  placeholder="Enter principal access code"
                  value={accessCode}
                  onChange={(e) =>
                    setAccessCode(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowAccessCode(!showAccessCode)
                  }
                  aria-label="Show or hide access code"
                >
                  {showAccessCode ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="error-message">
                <span>⚠️</span>
                <p>{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Checking...
                </>
              ) : (
                <>
                  Login as Principal
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>

            {/* Create Account */}
            <p className="create-account-text">
              Don't have an account?{" "}
              <Link
                href="/principal-register"
                className="create-account-link"
              >
                Create Account
              </Link>
            </p>

          </form>

          {/* Security Note */}
          <div className="security-note">
            <span>🔐</span>
            <p>Secure access for authorized principals only</p>
          </div>

        </div>

        {/* Footer */}
        <p className="login-footer">
          © 2026 FacultyFlow · Smart Faculty Work Management System
        </p>

      </div>
    </main>
  );
}

