"use client";

export const login = async (email: string, password: string) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};
