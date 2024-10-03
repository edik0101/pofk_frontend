import Heading from "@/components/Heading/Heading";

export default function page() {
  return (
    <div>
      <Heading text="Личные данные" headingLvl={2} />
      <Heading text="Информация по тарифу" headingLvl={2} />
      <Heading text="Подключенные сотрудники" headingLvl={2} />
    </div>
  );
}
