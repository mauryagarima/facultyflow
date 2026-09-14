"use client";

import { useEffect, useState } from "react";
import "./notices.css";

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/notices");
      const result = await response.json();

      if (result.success) {
        setNotices(result.data);
      } else {
        setMessage("Failed to load notices");
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
      setMessage("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="notices-page">
      <div className="notices-container">

        <div className="notices-header">
          <h1>📢 Notice Board</h1>
          <p>Stay updated with important announcements.</p>
        </div>

        {loading ? (
          <p className="loading-message">Loading notices...</p>
        ) : message ? (
          <p className="error-message">{message}</p>
        ) : notices.length === 0 ? (
          <p className="empty-message">
            No notices available at the moment.
          </p>
        ) : (
          <div className="notices-list">
            {notices.map((notice) => (
              <div className="notice-card" key={notice._id}>

                <div className="notice-top">
                  <span className="notice-category">
                    {notice.category}
                  </span>

                  <span className="notice-date">
                    📅{" "}
                    {new Date(notice.date).toLocaleDateString()}
                  </span>
                </div>

                <h2>{notice.title}</h2>

                <p>{notice.description}</p>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}