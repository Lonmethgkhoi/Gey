import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState(null);

  const handleVerify = async () => {
    const res = await fetch("/api/verify-turnstile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (data.success) {
      window.location.href = "/verify";
    } else {
      alert("Verification failed!");
    }
  };

  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center bg-black">
      {/* background hexagon */}
      <canvas id="particles" className="absolute top-0 left-0 w-full h-full" />
      
      <div className="z-10 text-center">
        <h1 className="text-3xl text-white font-bold mb-6">Get Your Key</h1>
        
        {/* Turnstile widget */}
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          data-callback={(tok) => setToken(tok)}
        ></div>
        
        <button
          onClick={handleVerify}
          className="mt-4 px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-400 text-black font-bold"
        >
          Get Key
        </button>
      </div>
    </div>
  );
}
