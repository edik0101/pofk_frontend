import Registration from "@/components/Forms/Registration/Registration";
import Heading from "@/components/Heading/Heading";

export default function page() {
  return (
    <div>
      <Heading text="Регистрация" />
      <h3 className="text-[22px]">
        Введите свои данные, чтобы начать пользоваться сервисом бесплатно первые
        7 дней
      </h3>
      <Registration />
    </div>
  );
}
