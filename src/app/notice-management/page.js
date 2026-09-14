"use client";

import { useEffect, useState } from "react";
import "./notice-management.css";

export default function NoticeManagement() {
  const [notices, setNotices] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // सभी notices लाना
  const fetchNotices = async () => {
    try {
      const response = await fetch("/api/notices");
      const result = await response.json();

      if (result.success) {
        setNotices(result.data);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Input बदलने के लिए
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // नया notice save करने के लिए
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/notices", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Notice published successfully! ✅");

        setFormData({
          title: "",
          description: "",
          category: "General",
        });

        // नया notice तुरंत list में दिखाने के लिए
        fetchNotices();
      } else {
        setMessage(result.message || "Failed to publish notice");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server connection error");
    }

    setLoading(false);
  };

  return (
    <main className="notice-management-page">
      <div className="notice-management-container">

        <div className="page-header">
          <h1>📢 Notice Management</h1>
          <p>Create and manage important college notices.</p>
        </div>

        {/* Create Notice Form */}
        <div className="notice-form-card">
          <h2>Create New Notice</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Notice Title</label>

              <input
                type="text"
                name="title"
                placeholder="Enter notice title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Important">Important</option>
                <option value="Academic">Academic</option>
                <option value="Meeting">Meeting</option>
                <option value="Exam">Exam</option>
              </select>
            </div>

            <div className="form-group">
              <label>Notice Description</label>

              <textarea
                name="description"
                placeholder="Write notice details here..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {message && (
              <p className="message">{message}</p>
            )}

            <button
              type="submit"
              className="publish-button"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Notice"}
            </button>

          </form>
        </div>

        {/* Notice List */}
        <div className="notices-section">

          <h2>Published Notices</h2>

          {notices.length === 0 ? (
            <p className="empty-message">
              No notices available.
            </p>
          ) : (
            <div className="notices-list">

              {notices.map((notice) => (
                <div className="notice-card" key={notice._id}>

                  <div className="notice-card-top">
                    <span className="category">
                      {notice.category}
                    </span>

                    <span className="date">
                      📅 {new Date(notice.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3>{notice.title}</h3>

                  <p>{notice.description}</p>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </main>
  );
}