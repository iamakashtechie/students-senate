import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Proxy route for file downloads.
 *
 * - Cloudinary /raw/upload/ files (PDFs): authenticated via private_download_url
 * - Cloudinary /image/upload/ files (images): served directly (they are public)
 * - Cloudinary /image/upload/ with .pdf extension: these are corrupted legacy
 *   uploads; we redirect the browser to the URL directly so at least it doesn't
 *   show a 500, and show a browser-level error instead.
 * - Other external URLs: proxied directly
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const filename = searchParams.get("filename") || "document";

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    let finalName = filename;
    let fetchUrl = url;

    const isCloudinary = url.includes("cloudinary.com");
    const isCloudinaryImagePdf =
      isCloudinary &&
      url.includes("/image/upload/") &&
      url.toLowerCase().includes(".pdf");

    if (isCloudinary && url.includes("/raw/upload/")) {
      // Raw PDF uploads — need authenticated access
      if (!finalName.toLowerCase().endsWith(".pdf")) finalName += ".pdf";

      const afterUpload = new URL(url).pathname.split("/upload/")[1];
      const parts = afterUpload.split("/");
      // Strip version segment (e.g. v1234567890)
      if (parts[0]?.match(/^v\d+$/)) parts.shift();
      const publicId = parts.join("/");

      fetchUrl = cloudinary.utils.private_download_url(publicId, "", {
        type: "upload",
        resource_type: "raw",
      });
    }
    // Legacy PDFs might exist as /image/upload/...pdf URLs. These often require
    // signed download URLs on Cloudinary and return 401 if fetched directly.
    if (isCloudinaryImagePdf) {
      if (!finalName.toLowerCase().endsWith(".pdf")) finalName += ".pdf";

      const afterUpload = new URL(url).pathname.split("/upload/")[1];
      const parts = afterUpload.split("/");
      if (parts[0]?.match(/^v\d+$/)) parts.shift();

      // Cloudinary image public IDs for PDFs are typically stored without the .pdf suffix.
      const imagePublicId = parts.join("/").replace(/\.pdf$/i, "");

      fetchUrl = cloudinary.utils.private_download_url(imagePublicId, "pdf", {
        type: "upload",
        resource_type: "image",
      });
    }
    // For /image/upload/ URLs (images), use the URL directly.
    // Cloudinary images are publicly accessible without authentication.

    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error(`Upstream ${response.status}: ${response.statusText}`);
    }

    const headers = new Headers();
    headers.set(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream"
    );
    headers.set("Content-Disposition", `attachment; filename="${finalName}"`);

    return new NextResponse(response.body, { status: 200, headers });
  } catch (error) {
    console.error("Download proxy error:", error);
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 });
  }
}
