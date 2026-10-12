const fs = require("fs");
const path = require("path");

// One real, business-provided Terms & Conditions PDF per service --
// these are the actual documents, not generated text, so the client's
// letterhead/branding/watermark come through exactly as designed.
const TERMS_DIR = path.join(__dirname, "..", "assets", "terms");

const SERVICE_TERMS_FILES = {
  "app-development": "app-development.pdf",
  branding: "branding.pdf",
  "ecommerce-website": "ecommerce-website.pdf",
  "graphic-designing": "graphic-designing.pdf",
  seo: "seo.pdf",
  "social-media-marketing": "social-media-marketing.pdf",
  "video-editing": "video-editing.pdf",
  "website-designing": "website-designing.pdf",
  "website-development": "website-development.pdf",
  "website-maintenance": "website-maintenance.pdf",
};

// Returns { filename, content } for the given service's T&C PDF, or
// null if there's no dedicated file for that service (caller should
// just skip attaching one rather than guessing).
function getTermsPdfForService(serviceSlug) {
  const fileName = SERVICE_TERMS_FILES[serviceSlug];
  if (!fileName) return null;

  const filePath = path.join(TERMS_DIR, fileName);
  if (!fs.existsSync(filePath)) return null;

  return {
    filename: `Terms-and-Conditions-${fileName}`,
    content: fs.readFileSync(filePath),
  };
}

module.exports = { getTermsPdfForService, SERVICE_TERMS_FILES };
