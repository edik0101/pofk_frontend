import { NextRequest, NextResponse } from "next/server";

const protectedPages: string[] = ["/settings"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const res = NextResponse.next();

  if (
    token &&
    refreshToken &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/settings/profile", req.url));
  }

  if (!token && refreshToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/api/auth/refreshToken";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (
    !token &&
    !refreshToken &&
    !protectedPages.find((p) => req.nextUrl.pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  if (token && refreshToken) {
    return res;
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
