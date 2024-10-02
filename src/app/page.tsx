import { PAGES_HEADER } from "@/data/pages";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(PAGES_HEADER[1].path);
}
