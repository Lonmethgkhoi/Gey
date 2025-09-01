import { useEffect, useState } from "react";

export default function Verify() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    const verifySession = async () => {
      const res = await fetch("/api/verify-session");
      const data = await res.json();
      if (data.valid) {
        setStatus("✅ Session hợp lệ! Đang cấp key...");
        setTimeout(() => {
          window.location.href = "/extend";
        }, 1500);
      } else {
        setStatus("❌ Session không hợp lệ. Hãy quay lại trang Get Key.");
      }
    };
    verifySession();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <p className="text-xl">{status}</p>
    </div>
  );
}
