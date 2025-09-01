export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: "Missing sessionId" });
    }

    // ⚡ Giả lập storage session (sau này thay bằng Durable Object / Redis / KV)
    const activeSessions = global.activeSessions || {};
    global.activeSessions = activeSessions;

    const session = activeSessions[sessionId];

    if (!session) {
      return res.status(401).json({ valid: false, message: "Session not found" });
    }

    // Check hết hạn (ví dụ session sống 10 phút)
    const now = Date.now();
    if (now > session.expiresAt) {
      delete activeSessions[sessionId];
      return res.status(401).json({ valid: false, message: "Session expired" });
    }

    // Nếu hợp lệ
    return res.status(200).json({
      valid: true,
      message: "Session verified",
      session
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
                                   }
