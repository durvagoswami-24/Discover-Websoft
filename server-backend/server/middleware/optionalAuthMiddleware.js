const jwt = require("jsonwebtoken");
const User = require("../models/User");

// For routes that must work for BOTH guests and logged-in users (like
// submitting a quotation). If a valid customer token is present, this
// attaches req.user so the submission gets linked to their account;
// if the header is missing, malformed, or the token is invalid/expired,
// it silently continues as a guest instead of blocking the request --
// unlike requireAuth, this middleware never returns a 401.
async function attachUserIfPresent(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      req.user = user;
    }
  } catch (err) {
    // Invalid/expired token on an optional route -- just proceed as a guest.
  }

  next();
}

module.exports = { attachUserIfPresent };
