import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("access_token")?.value;

  const res = await fetch(`${process.env.URL_BACK}/CreateAccount/GetUsers`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ success: false });
  }

  const data = await res.json();
  return NextResponse.json({ success: true, data });
}
