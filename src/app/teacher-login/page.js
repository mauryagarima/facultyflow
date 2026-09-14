
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./teacher-login.css";

const TEACHER_SECRET_CODE = "TEACHER2026";

export default function TeacherLogin() {
  const router = useRouter();

  const [secretCode, setSecretCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    // Fixed Secret Code verification
    if (secretCode !== TEACHER_SECRET_CODE) {
      setTimeout(() => {
        setLoading(false);
        setError("Invalid teacher secret code.");
      }, 500);
      return;
    }

    // Email and Password are not fixed
    router.push("/teacher-dashboard");
  };

  return (
    <main className="teacher-login-page">

      {/* Background Decorations */}
      <div className="teacher-blob teacher-blob-one"></div>
      <div className="teacher-blob teacher-blob-two"></div>

      <div className="teacher-login-container">

        {/* Back Button */}
        <Link href="/role-selection" className="back-button">
          <span>←</span> Back to Roles
        </Link>

        {/* Login Card */}
        <div className="login-card">

          {/* Brand */}
          <div className="brand-section">
            <div className="login-icon">
              👩‍🏫
            </div>

            <div className="brand-name">
              Faculty<span>Flow</span>
            </div>
          </div>

          <h1>Teacher Login</h1>

          <p className="subtitle">
            Welcome back! Login to manage your academic activities
            and assigned tasks.
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

            {/* Secret Code */}
            <div className="input-group">
              <label>Teacher Secret Code</label>

              <div className="input-wrapper">
                <span className="input-icon">🔑</span>

                <input
                  type={showSecretCode ? "text" : "password"}
                  placeholder="Enter secret code"
                  value={secretCode}
                  onChange={(e) =>
                    setSecretCode(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowSecretCode(!showSecretCode)
                  }
                  aria-label="Show or hide secret code"
                >
                  {showSecretCode ? "🙈" : "👁️"}
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
                  Login as Teacher
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>

            {/* Register */}
            <p className="create-account-text">
              Don't have an account?{" "}
              <Link
                href="/teacher-register"
                className="create-account-link"
              >
                Create Account
              </Link>
            </p>

          </form>

          {/* Security Note */}
          <div className="security-note">
            <span>🔐</span>
            <p>Secure access for authorized teachers only</p>
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

