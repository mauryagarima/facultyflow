"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import "./teacher-login.css";
import { useState } from "react";

const TEACHER_SECRET_CODE = "TEACHER2026";

export default function TeacherLogin() {
  const router = useRouter();

  const [secretCode, setSecretCode] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Fixed Secret Code verification
    if (secretCode !== TEACHER_SECRET_CODE) {
      alert("❌ Invalid Secret Code");
      return;
    }

    // Email and Password are not fixed
    router.push("/teacher-dashboard");
  };

  return (
    <main className="teacher-login-page">
      <div className="teacher-login-container">

        <Link href="/role-selection" className="back-button">
          ← Back
        </Link>

        <div className="login-card">
          <div className="login-icon">👩‍🏫</div>

          <h1>Teacher Login</h1>

          <p className="subtitle">
            Login to manage your academic activities.
          </p>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="input-group">
              <label>Official Email</label>

              <input
                type="email"
                placeholder="Enter your official email"
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Secret Code */}
            <div className="input-group">
              <label>Teacher Secret Code</label>

              <input
                type="password"
                placeholder="Enter secret code"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Login as Teacher
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}