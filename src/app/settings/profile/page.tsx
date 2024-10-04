import InstructionsButton from "@/components/Buttons/Instructions/Instructions";
import Registration from "@/components/Forms/Registration/Registration";
import Heading from "@/components/Heading/Heading";
import SimpleTable from "@/components/Tables/SimpleTable/SimpleTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookMarkedIcon, MoveRightIcon, PlusIcon, X } from "lucide-react";
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

const EmployeeListColumns = ["Имя", "Почта", "Роль", "", ""];
const changeRoleBtn = (
  <Button
    variant="outline"
    className="h-12 rounded-3xl border border-primary bg-transparent text-base text-primary"
  >
    Поменять роль
  </Button>
);
const closeAccessBtn = (
  <Button
    variant="outline"
    className="h-12 rounded-3xl border-none bg-transparent text-base text-slate-500 shadow-none"
  >
    <X size={10} strokeWidth={2} className="mr-1" />
    <span>Закрыть доступ</span>
  </Button>
);
const EmployeeList = [
  {
    name: "Александр В.",
    email: "example1@mail.ru",
    role: "Операционист",
    changeRoleBtn: changeRoleBtn,
    closeAccessBtn: closeAccessBtn,
  },
  {
    name: "Дарья Ф.",
    email: "example1@mail.ru",
    role: "Финансит",
    changeRoleBtn: changeRoleBtn,
    closeAccessBtn: closeAccessBtn,
  },
  {
    name: "Андрей М.",
    email: "example1@mail.ru",
    role: "Ассистент",
    changeRoleBtn: changeRoleBtn,
    closeAccessBtn: closeAccessBtn,
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
            className="group mr-8 flex items-center gap-1 text-sm text-slate-500 hover:opacity-80"
          >
            <BookMarkedIcon size={20} />
            Помощь с сервисом
            <MoveRightIcon className="group-hover:translate-x-2" />
          </Link>
        </div>
      </Card>
      <div className="flex items-baseline justify-between">
        <Heading text="Подключенные сотрудники" headingLvl={2} />
        <Button
          variant="outline"
          className="h-14 rounded-3xl border border-black bg-transparent"
        >
          <PlusIcon className="mr-2" /> Добавить сотрудника
        </Button>
      </div>
      <Card className="bg-white p-4">
        <SimpleTable data={EmployeeList} columnsHeaders={EmployeeListColumns} />
      </Card>
    </div>
  );
}
