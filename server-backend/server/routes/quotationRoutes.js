const express = require("express");
const router = express.Router();
const {
  createQuotation,
  listQuotations,
  getQuotation,
  updateQuotationStatus,
  downloadQuotationPdf,
  sendQuotationToCustomer,
} = require("../controllers/quotationController");
const { requireAdmin } = require("../middleware/adminMiddleware");
const { attachUserIfPresent } = require("../middleware/optionalAuthMiddleware");

// Public -- guests and logged-in users can both submit a quote request.
// attachUserIfPresent links it to the account when a valid token is sent,
// without ever blocking a guest who has none.
router.post("/", attachUserIfPresent, createQuotation);

// Admin only -- viewing and managing submitted quotations
router.get("/", requireAdmin, listQuotations);
router.get("/:id", requireAdmin, getQuotation);
router.patch("/:id/status", requireAdmin, updateQuotationStatus);
router.get("/:id/pdf", requireAdmin, downloadQuotationPdf);
router.post("/:id/send", requireAdmin, sendQuotationToCustomer);

module.exports = router;
