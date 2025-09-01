import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const handleVerify = async () => {
    if (!token) return alert("Chưa có token!");
    const res = await fetch("/api/verify-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (data.success) {
      setSessionId(data.sessionId);
    } else {
      alert("Verify thất bại");
    }
  };

  return (
    <div className="container">
      <h1>Get Key System</h1>

      {/* Turnstile widget */}
      <div
        className="cf-turnstile"
        data-sitekey="YOUR_SITE_KEY" // 👈 Site key (public)
        data-callback={(tok) => setToken(tok)}
      ></div>

      <button onClick={handleVerify}>Xác minh</button>

      {sessionId && (
        <div className="session-box">
          <p>✅ Session đã tạo:</p>
          <code>{sessionId}</code>
        </div>
      )}
    </div>
  );
          }
