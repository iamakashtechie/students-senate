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
    const ext = filename.split(".").pop().toLowerCase();
    const isPdf = ext === "pdf";
    
    // Sanitize filename to remove spaces and special characters for a clean URL
    const cleanName = filename.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_\-]/g, "_");
    const uniqueName = `${cleanName}_${Date.now()}`;
    const publicId = isPdf ? `${uniqueName}.pdf` : uniqueName;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "students-senate", 
        resource_type: isPdf ? "raw" : "image",
        public_id: publicId,
        use_filename: true,
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
