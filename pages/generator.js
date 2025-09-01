import { useEffect, useState } from "react";

export default function Generator() {
  const [keyData, setKeyData] = useState(null);
  const sid = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("sid") : null;

  useEffect(() => {
    if (!sid) return;
    fetch(`/api/generate-key?sid=${sid}`)
      .then((res) => res.json())
      .then((data) => setKeyData(data));
  }, [sid]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-[500px] text-center">
        <h1 className="text-xl font-bold mb-4">🎉 Your Key</h1>
        {keyData ? (
          <>
            <p className="mb-2">Key: <span className="font-mono">{keyData.key}</span></p>
            <p className="mb-4">Hạn dùng: {keyData.expiry} </p>
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => navigator.clipboard.writeText(keyData.key)}
            >
              Copy Key
            </button>
            <div className="mt-4">
              <a
                href={`/index?extend=true&sid=${sid}`}
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Extend Key
              </a>
            </div>
          </>
        ) : (
          <p>Creating key...</p>
        )}
      </div>
    </div>
  );
    }
