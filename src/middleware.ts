import { NextRequest, NextResponse } from "next/server";

const protectedPages: string[] = ["/settings", "/settings/:path*"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    if (!protectedPages.find((p) => p === req.nextUrl.pathname)) {
      return NextResponse.next();
    } else {
      return Response.redirect(new URL("/login", req.url));
    }
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
