const mongoose = require("mongoose");

// A single admin credential (per the Figma "Admin Login" panel, which has
// just one "Security Key" field, not a username+password pair). Nothing
// stops you adding more admin documents later if multiple admins are
// needed -- the login logic just checks the key against every document.
const adminSchema = new mongoose.Schema(
  {
    label: { type: String, default: "Primary Admin" },
    securityKeyHash: { type: String, required: true }, // bcrypt hash
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
