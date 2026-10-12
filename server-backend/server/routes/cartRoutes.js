const express = require("express");
const router = express.Router();
const {
  getCart,
  syncCart,
  getWishlist,
  syncWishlist,
} = require("../controllers/cartController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/cart", requireAuth, getCart);
router.put("/cart", requireAuth, syncCart);
router.get("/wishlist", requireAuth, getWishlist);
router.put("/wishlist", requireAuth, syncWishlist);

module.exports = router;
