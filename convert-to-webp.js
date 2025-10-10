import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputFolder = "./public";   // Folder where your JPGs are
const outputFolder = "./public/webp";    // Folder for optimized WebPs

// Create output folder if it doesn’t exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach((file) => {
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file.replace(/\.(jpg|jpeg)$/i, ".webp"));

    sharp(inputPath)
      .webp({ quality: 80 })  // Adjust quality (70–85 recommended)
      .toFile(outputPath)
      .then(() => console.log(`✅ Converted: ${file} → ${outputPath}`))
      .catch(err => console.error("❌ Error:", err));
  }
});
