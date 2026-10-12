const { execFile } = require("child_process");
const fs = require("fs/promises");
const os = require("os");
const path = require("path");
const crypto = require("crypto");

// Encrypts a PDF (256-bit) with an EMPTY user password (so anyone can
// still open and read it with no password prompt) but a real owner
// password that locks down permissions -- nobody can edit, copy/extract
// content, or annotate it without that password, which we don't share.
// Printing is left allowed since only "not editable" and "not copyable"
// were asked for.
//
// Requires the `qpdf` command-line tool to be installed on the server
// (e.g. `apt-get install qpdf` on Debian/Ubuntu-based hosts, or
// `brew install qpdf` for local Mac dev). If it's missing, this
// rejects -- callers should catch and fall back to sending the
// unrestricted PDF rather than losing the email entirely.
function restrictPdf(pdfBuffer) {
  return new Promise((resolve, reject) => {
    const tmpDir = os.tmpdir();
    const id = crypto.randomBytes(6).toString("hex");
    const inputPath = path.join(tmpDir, `dws-in-${id}.pdf`);
    const outputPath = path.join(tmpDir, `dws-out-${id}.pdf`);

    const cleanup = async () => {
      await fs.unlink(inputPath).catch(() => {});
      await fs.unlink(outputPath).catch(() => {});
    };

    fs.writeFile(inputPath, pdfBuffer)
      .then(() => {
        const ownerPassword =
          process.env.PDF_OWNER_PASSWORD || "DiscoverWebsoft#Locked2026";

        const args = [
          "--encrypt",
          "", // user password: empty -- opens with no password required
          ownerPassword, // owner password: required to change permissions
          "256",
          "--modify=none", // no editing
          "--extract=n", // no copying/extracting text or images
          "--annotate=n", // no adding comments or filling forms
          "--print=full", // printing still allowed
          "--",
          inputPath,
          outputPath,
        ];

        execFile("qpdf", args, async (err) => {
          if (err) {
            await cleanup();
            return reject(err);
          }
          try {
            const output = await fs.readFile(outputPath);
            await cleanup();
            resolve(output);
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

module.exports = { restrictPdf };
