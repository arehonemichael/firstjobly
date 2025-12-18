import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const today = new Date().toISOString().slice(0, 10);
  const userAgent = request.headers.get("user-agent") || "";

  // CHANGE DATE TO TODAY
  if (today === "2025-12-18" && /android/i.test(userAgent)) {
    return NextResponse.redirect(
      new URL(
        "https://play.google.com/store/apps/details?id=com.first.firstjobly",
        request.url
      ),
      302
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
