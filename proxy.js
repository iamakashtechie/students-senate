import { NextResponse } from "next/server";
import { validateSession } from "@/lib/sessions";

// protect /admin and all /api/ routes EXCEPT /api/admin/login
export function proxy(request) {
  const { pathname } = request.nextUrl;

  // skip public routes
  if (
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // exclude the login page itself and the login API
  // allow public API routes
  if (
    pathname === "/api/admin/login" ||
    pathname === "/api/download" ||
    (pathname === "/api/notifications" && request.method === "GET") ||
    pathname.includes("/api/public/") // if any exist in the future
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("admin_session");
  const isAuthenticated = validateSession(sessionCookie?.value);

  if (!isAuthenticated) {
    // redirect to login page for browser navigation
    if (pathname.startsWith("/admin")) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // return 401 for API calls
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
