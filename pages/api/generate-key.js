export default function handler(req, res) {
  const { sid } = req.query;

  global.sessions = global.sessions || {};
  const session = global.sessions[sid];
  if (!session || !session.valid) {
    return res.status(403).json({ error: "Invalid session" });
  }

  // Generate key
  const key = "Hexagon_" + [...Array(40)].map(() => Math.random().toString(36)[2]).join("");
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Save key in session
  session.key = key;
  session.expiry = expiry;

  res.json({ key, expiry: expiry.toISOString() });
}
