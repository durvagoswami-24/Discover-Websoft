const { execFile } = require("child_process");
const fs = require("fs/promises");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const PDFDocument = require("pdfkit");

// Turns a normal (text-based) PDF into one made entirely of flattened
// page images, with NO text objects at all.
//
// Why: PDF "permission" restrictions (no-copy, no-extract flags applied
// via qpdf) are cosmetic -- they only stop compliant readers from
// letting a person click "copy". Anyone can strip them instantly with
// `qpdf --decrypt`, and they do nothing to stop a script or AI tool from
// reading the underlying text stream directly. They also caused a real
// bug: several webmail inline-PDF previewers (Hostinger's included)
// render permission-encrypted PDFs as a blank page even though the file
// opens fine elsewhere.
//
// Rasterizing each page removes the text layer entirely, so there is
// nothing to select, copy, or text-extract -- by construction, not by
// asking readers nicely. It also sidesteps the encryption-related blank
// page bug completely, since the output PDF has no encryption at all.
//
// Requires the `pdftoppm` command from poppler-utils on the server
// (e.g. `apt-get install poppler-utils` on Debian/Ubuntu hosts, already
// preinstalled on many hosting platforms). If it's missing, this
// rejects -- callers should catch and fall back to sending the original
// PDF rather than losing the email entirely.
function rasterizePdfToImageOnly(pdfBuffer, { dpi = 150 } = {}) {
  return new Promise((resolve, reject) => {
    const tmpDir = os.tmpdir();
    const id = crypto.randomBytes(6).toString("hex");
    const inputPath = path.join(tmpDir, `dws-raster-in-${id}.pdf`);
    const outputPrefix = path.join(tmpDir, `dws-raster-out-${id}`);

    const cleanup = async (pageFiles = []) => {
      await fs.unlink(inputPath).catch(() => {});
      await Promise.all(
        pageFiles.map((f) => fs.unlink(f).catch(() => {}))
      );
    };

    fs.writeFile(inputPath, pdfBuffer)
      .then(() => {
        const args = ["-png", "-r", String(dpi), inputPath, outputPrefix];

        execFile("pdftoppm", args, async (err) => {
          if (err) {
            await cleanup();
            return reject(err);
          }

          try {
            const dir = tmpDir;
            const prefixName = path.basename(outputPrefix);
            const allFiles = await fs.readdir(dir);
            const pageFiles = allFiles
              .filter(
                (f) => f.startsWith(prefixName) && f.endsWith(".png")
              )
              .sort() // pdftoppm names pages -1, -2, ... -10, so plain
              // string sort is fine up to 9 pages; quotations are
              // always 1 page so this doesn't need natural-sort here.
              .map((f) => path.join(dir, f));

            if (pageFiles.length === 0) {
              await cleanup();
              return reject(new Error("pdftoppm produced no page images"));
            }

            const outDoc = new PDFDocument({ autoFirstPage: false });
            const chunks = [];
            outDoc.on("data", (chunk) => chunks.push(chunk));
            outDoc.on("end", async () => {
              await cleanup(pageFiles);
              resolve(Buffer.concat(chunks));
            });
            outDoc.on("error", async (docErr) => {
              await cleanup(pageFiles);
              reject(docErr);
            });

            for (const file of pageFiles) {
              const imgBuffer = await fs.readFile(file);
              const img = outDoc.openImage(imgBuffer);
              outDoc.addPage({ size: [img.width, img.height], margin: 0 });
              outDoc.image(imgBuffer, 0, 0, {
                width: img.width,
                height: img.height,
              });
            }

            outDoc.end();
          } catch (readErr) {
            await cleanup();
            reject(readErr);
          }
        });
      })
      .catch(async (writeErr) => {
        await cleanup();
        reject(writeErr);
      });
  });
}

module.exports = { rasterizePdfToImageOnly };
