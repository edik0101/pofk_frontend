import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformPhoneNumber(phone: string): string {
  let cleanedPhone = phone.replace(/\D/g, "");

  if (!cleanedPhone.startsWith("7")) {
    cleanedPhone = "7" + cleanedPhone;
  }

  return cleanedPhone;
}
