import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const params = new URLSearchParams({
      client_id: process.env.CLIENT_ID as string,
      client_secret: process.env.CLIENT_SECRET as string,
      grant_type: "password",
      username: email,
      password: password,
    });

    const res = await fetch(`${process.env.URL_BACK}/connect/token`, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!res.ok) {
      if (res.status === 400) {
        throw new Error("Неверный логин или пароль" as string);
      }
      throw new Error("Неизвестная ошибка при логине" as string);
    }

    const data = await res.json();

    cookies().set("access_token", data.access_token, {
      httpOnly: true,
      maxAge: data.expires_in,
    });

    // cookies().set("refresh_token", data.refresh_token, {
    //   httpOnly: true,
    //   maxAge: data.refresh_expires_in,
    // })

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "",
    });
  }
}
