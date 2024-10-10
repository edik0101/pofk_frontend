import { FetchedRole, FetchedUser } from "@/types/types";
import { cookies } from "next/headers";

export const getUsers = async () => {
  try {
    const token = cookies().get("access_token")?.value;
    const res = await fetch(`${process.env.URL_BACK}/CreateAccount/GetUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Не удалось получить список сотрудников" as string);
    }

    const users: FetchedUser[] = await res.json();
    return users;
  } catch (error) {
    console.error("getUsers error: ", error);
  }
};

export const getRoles = async () => {
  try {
    const token = cookies().get("access_token")?.value;
    const res = await fetch(`${process.env.URL_BACK}/CreateRole/GetRoles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Не удалось получить роли" as string);
    }

    const roles: FetchedRole[] = await res.json();
    return roles;
  } catch (error) {
    console.error("getUsers error: ", error);
  }
};
