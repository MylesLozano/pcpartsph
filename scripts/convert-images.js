// Simple Node.js script to convert JPG/PNG images to WebP
// Requires: npm install sharp

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "../public/mockData/images/source");
const targetDir = path.join(__dirname, "../public/mockData/images");

// Create directories if they don't exist
if (!fs.existsSync(sourceDir)) {
  fs.mkdirSync(sourceDir, { recursive: true });
}
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Process all images in the source directory
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const stats = fs.statSync(sourceFile);

    // Skip if not a file
    if (!stats.isFile()) return;

    // Skip if not an image
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

    // Create output filename
    const baseName = path.basename(file, ext);
    const targetFile = path.join(targetDir, `${baseName}.webp`);

    // Convert to WebP
    sharp(sourceFile)
      .webp({ quality: 80 }) // 80% quality is a good balance
      .toFile(targetFile)
      .then(() => console.log(`Converted ${file} -> ${baseName}.webp`))
      .catch((err) => console.error(`Error converting ${file}:`, err));
  });
});

console.log(
  "Place your JPG/PNG images in the 'source' folder and run this script to convert them to WebP"
);
