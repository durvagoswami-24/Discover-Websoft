const mongoose = require("mongoose");

// Cart/wishlist items are stored in the shape the frontend Redux slices
// already use (slug-keyed), so syncing is a straight read/replace --
// no reshaping needed on either side.
const cartItemSchema = new mongoose.Schema(
  {
    serviceSlug: String,
    subServiceSlug: String,
    subSubServiceSlug: String,
    planSlug: String,
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, trim: true },
    password: { type: String, required: true }, // bcrypt hash, never plaintext

    cart: [cartItemSchema],
    // Keep the complete plan card data so wishlist entries can be shown
    // and linked correctly after a user signs in on another device.
    wishlist: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
