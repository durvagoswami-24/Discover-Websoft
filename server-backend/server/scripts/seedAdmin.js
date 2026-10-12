// Run once with `npm run seed:admin` to create the admin login record,
// using ADMIN_SECURITY_KEY from .env. Safe to run again later -- it
// checks for an existing admin and skips instead of duplicating.
require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");

async function seed() {
  await connectDB();

  const existing = await Admin.findOne();
  if (existing) {
    console.log("An admin record already exists -- skipping seed.");
    console.log(
      "To change the security key, edit it directly in the database, or delete the existing Admin document and re-run this script."
    );
    process.exit(0);
  }

  const key = process.env.ADMIN_SECURITY_KEY;
  if (!key) {
    console.error("ADMIN_SECURITY_KEY is not set in .env");
    process.exit(1);
  }

  const securityKeyHash = await bcrypt.hash(key, 10);
  await Admin.create({ securityKeyHash });

  console.log("Admin record created. You can now log in with the security key from your .env.");
  process.exit(0);
}

seed();
