import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const refresh_token = cookies().get("refresh_token")?.value;

  if (!refresh_token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const params = new URLSearchParams({
      client_id: process.env.CLIENT_ID as string,
      client_secret: process.env.CLIENT_SECRET as string,
      grant_type: "refresh_token",
      refresh_token,
    });

    const res = await fetch(`${process.env.URL_BACK}/connect/token`, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!res.ok) {
      cookies().delete("access_token");
      cookies().delete("refresh_token");
      throw new Error("Не удалось обновить токен" as string);
    }

    const data = await res.json();

    cookies().set("access_token", data.access_token, {
      httpOnly: true,
      maxAge: data.expires_in,
    });

    cookies().set("refresh_token", data.refresh_token, {
      httpOnly: true,
    });

    const nextUrl = req.nextUrl.searchParams.get("next") || "/";
    return NextResponse.redirect(new URL(nextUrl, req.url));
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
