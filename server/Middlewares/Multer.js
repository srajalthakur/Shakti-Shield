import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

// Get current file path and directory (since __dirname is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define uploads directory path
const uploadsDir = path.join(__dirname, "..", "uploads");

// Ensure uploads directory exists, create it if it doesn't
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory at: ${uploadsDir}`);
}

// Configure Multer storage
const storage = multer.diskStorage({
  /**
   * Sets destination folder where files will be saved
   */
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  /**
   * Sets file name as current timestamp + original file extension
   */
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Initialize multer upload instance
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Optional: Restrict file types (e.g., images only)
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpg, jpeg, png, gif)"));
    }
  }
});
