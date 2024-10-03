import { PagesPaths } from "@/data/pages";
import { redirect } from "next/navigation";

export default function page() {
  redirect(`settings/${PagesPaths["personal-settings"]}`);
}
