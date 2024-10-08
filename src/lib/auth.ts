import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function logout() {
  cookies().delete("access_token");
}

export const refreshToken = async (req: NextRequest) => {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};
