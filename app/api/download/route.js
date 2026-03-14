import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure cloudinary explicitly here since it might run in Edge or Serverless functions
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const filename = searchParams.get("filename") || "document";

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    // Determine if we need to format the filename based on the URL type
    let finalName = filename;
    
    let fetchUrl = url;

    // Check if it's a Cloudinary raw file (PDFs)
    const isCloudinaryPDF = url.includes("cloudinary.com") && url.includes("/raw/upload/");
    if (isCloudinaryPDF) {
      if (!finalName.toLowerCase().endsWith(".pdf")) {
        finalName = `${finalName}.pdf`;
      }
      
      // Extract the public_id from the Cloudinary URL
      // Format: https://res.cloudinary.com/.../raw/upload/v1234567890/folder/filename.ext
      try {
        const urlParts = new URL(url).pathname.split("/upload/")[1].split("/");
        // Remove version number if present (starts with 'v' followed by numbers)
        if (urlParts[0].match(/^v\d+$/)) {
          urlParts.shift();
        }
        const publicId = urlParts.join("/");
        
        // Generate an authenticated download URL using our server secrets
        fetchUrl = cloudinary.utils.private_download_url(
          publicId, 
          "", // format not needed for raw
          { type: "upload", resource_type: "raw" }
        );
      } catch (e) {
        console.error("Failed to parse Cloudinary URL", e);
      }
    }

    // Fetch the file from the external URL using the authenticated link if needed
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }

    // Create a streaming response
    const headers = new Headers();
    headers.set("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    
    // Force download with the correct filename
    headers.set("Content-Disposition", `attachment; filename="${finalName}"`);

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}
