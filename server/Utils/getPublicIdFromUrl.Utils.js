/**
 * Extracts the Cloudinary public_id from a secure URL.
 * Example URL: 
 * https://res.cloudinary.com/demo/image/upload/v1234567890/ContactImages/abc123.jpg
 * 
 * Expected public_id: ContactImages/abc123
 * 
 * @param {string} url - The full Cloudinary image URL.
 * @returns {string} - The extracted public_id (used for deleting or updating image).
 */
const getPublicIdFromUrl = (url) => {
  try {
    if (!url || typeof url !== 'string') {
      throw new Error('URL must be a valid string');
    }

    // Find the part after 'upload/'
    const urlParts = url.split('upload/');
    if (urlParts.length < 2) {
      throw new Error('Invalid Cloudinary URL format: missing upload segment');
    }

    const afterUpload = urlParts[1]; // e.g. v1234567890/ContactImages/abc123.jpg

    // Remove version part (e.g. v1234567890/) if present
    const parts = afterUpload.split('/');
    if (parts[0].match(/^v\d+$/)) {
      parts.shift(); // Remove version
    }

    // Join the rest -> ContactImages/abc123.jpg
    const pathWithExt = parts.join('/');

    // Remove file extension -> ContactImages/abc123
    const publicId = pathWithExt.replace(/\.[^/.]+$/, '');

    return publicId;
  } catch (error) {
    console.error("Error extracting public_id from URL:", error.message);
    throw error; // Let caller handle the error
  }
};

export default getPublicIdFromUrl;
