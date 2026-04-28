import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,        // API key
  api_secret: process.env.CLOUDINARY_SECRET,      // API secret
});

/**
 * Uploads a file to Cloudinary in the "ContactImages" folder
 * @param {string} filePath - Local file path to upload
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
async function cloudinaryUpload(filePath) {
  try {
    // Upload file to Cloudinary under the folder "ContactImages"
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "ContactImages",
    });

    // Return the secure (https) URL of the uploaded file
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
}

export { cloudinaryUpload };
