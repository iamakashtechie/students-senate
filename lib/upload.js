import { v2 as cloudinary } from "cloudinary";

// Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a Buffer (from an API request) directly to Cloudinary without writing to disk.
 * Supports PDFs (as raw files) and Images.
 * 
 * @param {Buffer} buffer - The file buffer to upload
 * @param {string} filename - The original filename (used to extract extension/type)
 * @returns {Promise<string>} - The secure URL of the uploaded file
 */
export async function uploadBuffer(buffer, filename) {
  return new Promise((resolve, reject) => {
    // PDF files should be uploaded as 'raw' or 'image' (Cloudinary converts PDFs if specified as image, but 'raw' is safer for downloads)
    // We'll use 'auto' to let Cloudinary detect the best resource type.
    const ext = filename.split(".").pop().toLowerCase();
    const resourceType = ext === "pdf" ? "raw" : "auto";

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "students-senate", 
        resource_type: resourceType,
        format: ext === "pdf" ? undefined : ext, // Don't force 'pdf' format on raw files
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    // Stream the buffer to Cloudinary
    uploadStream.end(buffer);
  });
}
