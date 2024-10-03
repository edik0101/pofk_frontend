import PasswordReset from "@/components/Forms/PasswordReset/PasswordReset";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <Heading text="Восстановление пароля" />
      <Link href="/login">Назад к авторизации</Link>
      <PasswordReset />
    </div>
  );
}
