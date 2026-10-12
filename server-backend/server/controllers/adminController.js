const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// POST /api/admin/login  -- body: { securityKey }
// Matches the Figma "Admin Login" panel's single Security Key field.
async function adminLogin(req, res) {
  try {
    const { securityKey } = req.body;

    if (!securityKey) {
      return res.status(400).json({ message: "Security key is required" });
    }

    const admins = await Admin.find();

    let matchedAdmin = null;
    for (const admin of admins) {
      const matches = await bcrypt.compare(securityKey, admin.securityKeyHash);
      if (matches) {
        matchedAdmin = admin;
        break;
      }
    }

    if (!matchedAdmin) {
      return res.status(401).json({ message: "Invalid security key" });
    }

    const token = jwt.sign(
      { id: matchedAdmin._id, isAdmin: true },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Admin login failed", error: err.message });
  }
}

module.exports = { adminLogin };
