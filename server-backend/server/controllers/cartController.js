const User = require("../models/User");

// A valid saved item always has a slug and a price -- anything missing
// either can't be rendered or totaled by the frontend, so it's dropped
// here rather than persisted. This is the same shape check the frontend
// applies; keeping it here too means bad data can never make it into
// the database in the first place, regardless of which client sends it.
function isValidItem(item) {
  return !!(item && item.slug && item.price != null);
}

// GET /api/cart  (protected)
async function getCart(req, res) {
  res.json({ cart: req.user.cart });
}

// PUT /api/cart  (protected) -- body: { cart: [...] }
// Full replace, matching how the Redux slice already holds cart state --
// the frontend sends its current cart array on every change, we overwrite.
async function syncCart(req, res) {
  try {
    const { cart } = req.body;

    if (!Array.isArray(cart)) {
      return res.status(400).json({ message: "cart must be an array" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { cart: cart.filter(isValidItem) },
      { new: true }
    ).select("cart");

    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: "Could not sync cart", error: err.message });
  }
}

// GET /api/wishlist  (protected)
async function getWishlist(req, res) {
  res.json({ wishlist: req.user.wishlist });
}

// PUT /api/wishlist  (protected) -- body: { wishlist: [...] }
async function syncWishlist(req, res) {
  try {
    const { wishlist } = req.body;

    if (!Array.isArray(wishlist)) {
      return res.status(400).json({ message: "wishlist must be an array" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { wishlist: wishlist.filter(isValidItem) },
      { new: true }
    ).select("wishlist");

    res.json({ wishlist: user.wishlist });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not sync wishlist", error: err.message });
  }
}

module.exports = { getCart, syncCart, getWishlist, syncWishlist };
