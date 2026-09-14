"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./mark-attendance.css";

export default function MarkAttendance() {
    const router = useRouter();

    const [subject, setSubject] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const markAttendance = () => {
        if (!subject) {
            setError("Please select a subject.");
            return;
        }

        setLoading(true);
        setMessage("");
        setError("");

        if (!navigator.geolocation) {
            setError("Location is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Get logged-in student
                    let student;

                    try {
                        student = JSON.parse(localStorage.getItem("student"));
                    } catch {
                        student = null;
                    }

                    if (!student?._id) {
                        setError("Student login required. Please login first.");
                        setLoading(false);
                        return;
                    }

                    const studentId = student._id;

                    const response = await fetch("/api/attendance", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            studentId,
                            subject,
                            latitude,
                            longitude,
                        }),
                    });

                    const data = await response.json();

                    if (data.success) {
                        setMessage(
                            `✅ ${data.message} Distance: ${data.distance} meters`
                        );
                    } else {
                        setError(
                            `❌ ${data.message}${data.distance
                                ? ` Distance: ${data.distance} meters`
                                : ""
                            }`
                        );
                    }
                } catch (err) {
                    setError("Something went wrong while marking attendance.");
                } finally {
                    setLoading(false);
                }
            },

            (locationError) => {
                setLoading(false);

                if (locationError.code === 1) {
                    setError(
                        "Location permission denied. Please allow location access."
                    );
                } else if (locationError.code === 2) {
                    setError("Unable to get your location.");
                } else {
                    setError("Location request timed out.");
                }
            }
        );
    };

    return (
        <main className="mark-attendance-page">
            <div className="attendance-container">

                <button
                    onClick={() => router.push("/student-dashboard")}
                    className="back-button"
                >
                    ← Back to Dashboard
                </button>

                <h1 className="attendance-title">
                    Mark Attendance
                </h1>

                <p className="attendance-description">
                    Your location will be checked before marking attendance.
                </p>

                <label className="subject-label">
                    Select Subject
                </label>

                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="subject-select"
                >
                    <option value="">-- Select Subject --</option>
                    <option value="Java">Java</option>
                    <option value="Information Security">
                        Information Security
                    </option>
                    <option value="Multimedia">Multimedia</option>
                    <option value="IoT">IoT</option>
                    <option value="Software Engineering">
                        Software Engineering
                    </option>
                </select>

                <button
                    onClick={markAttendance}
                    disabled={loading}
                    className="attendance-button"
                >
                    {loading
                        ? "Checking Location..."
                        : " Mark Attendance"}
                </button>

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

            </div>
        </main>
    );
}