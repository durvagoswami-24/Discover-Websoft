const jwt = require("jsonwebtoken");

// Protects admin-only routes -- verifies against ADMIN_JWT_SECRET
// (a separate secret from customer JWTs, so a leaked customer token
// can never be replayed as an admin token, and vice versa).
function requireAdmin(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired admin token" });
  }
}

module.exports = { requireAdmin };
