import { useState } from "react";

export default function Home() {
  const [sessionId, setSessionId] = useState(null);

  async function handleVerify(token) {
    const res = await fetch("/api/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (data.sessionId) setSessionId(data.sessionId);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-[400px]">
        <h1 className="text-xl font-bold mb-4 text-center">🔑 Key System</h1>

        {!sessionId ? (
          <div>
            {/* Turnstile */}
            <div
              className="cf-turnstile"
              data-sitekey="YOUR_TURNSILE_SITE_KEY"
              data-callback={(token) => handleVerify(token)}
            />
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">✅ Xác thực thành công!</p>
            <a
              href={`https://your-adslink.com/?sid=${sessionId}&next=/generator`}
              className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Get Key
            </a>
          </div>
        )}
      </div>
    </div>
  );
          }
