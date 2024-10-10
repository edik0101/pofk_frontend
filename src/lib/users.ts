import { cookies } from "next/headers";

export const getUsers = async () => {
  const token = cookies().get("access_token")?.value;

  const res = await fetch(`${process.env.URL_BACK}/CreateAccount/GetUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);

  const data = await res.json();
  console.log(data);
};
