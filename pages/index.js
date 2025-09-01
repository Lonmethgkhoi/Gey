import { useState, useEffect } from "react";

export default function Home() {
  const [token, setToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  // Load Turnstile script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
    <section>
      {/* HEXAGON BACKGROUND */}
      <canvas id="particles"></canvas>
      <div id="hexagonGrid"></div>

      {/* UI box */}
      <div className="ui-box">
        <h1>Key System</h1>
        <div
          className="cf-turnstile"
          data-sitekey="YOUR_SITE_KEY" // 👈 Thay bằng sitekey public
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
    </section>
  );
}
