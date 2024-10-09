import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, firstName, lastName, companyName, phoneNumber, password } =
    await req.json();

  try {
    const params = JSON.stringify({
      email: email,
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      phoneNumber: phoneNumber,
      password: password,
    });

    const res = await fetch(`${process.env.URL_BACK}/CreateAccount/Register`, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 409) {
        throw new Error("Пользователь с такой почтой уже существует" as string);
      }
      if (res.status === 400) {
        throw new Error(
          "При регистрации использованы некорректные данные" as string,
        );
      }
      throw new Error("Неизвестная ошибка при регистрации" as string);
    }

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
