export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { token } = req.body;

  // Verify Turnstile token (Cloudflare API)
  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSILE_SECRET,
      response: token,
    }),
  });
  const out = await verifyRes.json();

  if (!out.success) return res.status(400).json({ error: "Turnstile failed" });

  // Create session
  const sessionId = crypto.randomUUID();
  global.sessions = global.sessions || {};
  global.sessions[sessionId] = { created: Date.now(), valid: true };

  res.json({ sessionId });
}
