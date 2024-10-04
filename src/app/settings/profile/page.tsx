import InstructionsButton from "@/components/Buttons/Instructions/Instructions";
import Registration from "@/components/Forms/Registration/Registration";
import Heading from "@/components/Heading/Heading";
import SimpleTable from "@/components/Tables/SimpleTable/SimpleTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookMarkedIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";

const TarifTableData = [
  {
    name: "Тариф",
    value: "Ежемесячно",
  },
  {
    name: "Дата начала",
    value: "16.04.2024",
  },
  {
    name: "Дата окончания",
    value: "15.11.2024",
  },
  {
    name: "Следующий платеж",
    value: "5.000 ₽",
  },
];

const EmployeeListColumns = ["Имя", "Почта", "Роль"];
const EmployeeList = [
  {
    name: "Александр В.",
    email: "example1@mail.ru",
    role: "Операционист",
  },
  {
    name: "Дарья Ф.",
    email: "example1@mail.ru",
    role: "Финансит",
  },
  {
    name: "Андрей М.",
    email: "example1@mail.ru",
    role: "Ассистент",
  },
];

export default function Profile() {
  return (
    <div>
      <div className="flex items-baseline gap-5">
        <Heading text="Личные данные" headingLvl={2} />
        <InstructionsButton />
      </div>
      <Card className="bg-white p-4">
        <Registration isProfile={true} />
      </Card>
      <Heading text="Информация по тарифу" headingLvl={2} />
      <Card className="bg-white p-4">
        <SimpleTable data={TarifTableData} />
        <div className="mt-5 flex items-center justify-between">
          <Button variant="default" className="h-12 rounded-3xl px-8 text-base">
            Поменять тариф
          </Button>
          <Link
            href="#"
            className="group mr-8 flex items-center gap-1 text-slate-500 hover:opacity-80"
          >
            <BookMarkedIcon />
            Помощь с сервисом
            <MoveRightIcon className="group-hover:translate-x-2" />
          </Link>
        </div>
      </Card>
      <Heading text="Подключенные сотрудники" headingLvl={2} />
      <Card className="bg-white p-4">
        <SimpleTable data={EmployeeList} columnsHeaders={EmployeeListColumns} />
      </Card>
    </div>
  );
}
