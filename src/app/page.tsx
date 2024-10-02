import LoginForm from "@/components/Forms/LoginForm/LoginForm";
import Heading from "@/components/Heading/Heading";

export default function Home() {
  return (
    <div>
      <Heading text="Добро пожаловать в сервис ФинКонтроль!" />
      <h3 className="text-[22px]">Войдите, чтобы начать работу</h3>
      <LoginForm />
    </div>
  );
}
