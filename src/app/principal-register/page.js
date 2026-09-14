
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./principal-register.css";

export default function PrincipalRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    mobile: "",
    instituteName: "",
    username: "",
    password: "",
    confirmPassword: "",
    accessCode: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.fullName ||
      !formData.employeeId ||
      !formData.email ||
      !formData.instituteName ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.accessCode
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/principal/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Registration failed.");
        return;
      }

      setMessage("Principal account created successfully!");

      setTimeout(() => {
        router.push("/principal-login");
      }, 1500);
    } catch (error) {
      console.error("Registration Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="principal-register-page">
      <div className="principal-register-card">

        <div className="register-icon">
          🎓
        </div>

        <h1>Create Principal Account</h1>

        <p className="register-subtitle">
          Register your account to manage FacultyFlow
        </p>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Employee ID */}
          <div className="form-group">
            <label>Employee ID *</label>
            <input
              type="text"
              name="employeeId"
              placeholder="Enter employee ID"
              value={formData.employeeId}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              maxLength="10"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          {/* Institute */}
          <div className="form-group">
            <label>College / Institute Name *</label>
            <input
              type="text"
              name="instituteName"
              placeholder="Enter college or institute name"
              value={formData.instituteName}
              onChange={handleChange}
            />
          </div>

          {/* Username */}
          <div className="form-group">
            <label>Username *</label>
            <input
              type="text"
              name="username"
              placeholder="Create username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password *</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password *</label>

            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Access Code */}
          <div className="form-group">
            <label>Principal Access Code *</label>

            <input
              type="password"
              name="accessCode"
              placeholder="Enter principal access code"
              value={formData.accessCode}
              onChange={handleChange}
            />

            <small>
              Enter the authorized principal access code.
            </small>
          </div>

          {/* Error */}
          {error && (
            <div className="register-error">
              ❌ {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="register-success">
              ✅ {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <div className="login-link">
          Already have an account?

          <button
            type="button"
            onClick={() => router.push("/principal-login")}
          >
            Login
          </button>
        </div>

      </div>
    </main>
  );
}

