import { PlusIcon, X } from "lucide-react";
import Heading from "@/components/Heading/Heading";
import SimpleTable from "@/components/Tables/SimpleTable/SimpleTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

const EmployeeListColumns = ["Имя", "Почта", "Роль", "", ""];

export default async function Users() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <Heading text="Подключенные сотрудники" headingLvl={2} />
        <Button
          variant="outline"
          className="h-14 rounded-3xl border border-black bg-transparent"
        >
          <PlusIcon className="mr-2" /> Добавить сотрудника
        </Button>
      </div>
      <Card className="mt-5 rounded-3xl bg-white p-4">
        <SimpleTable data={EmployeeList} columnsHeaders={EmployeeListColumns} />
      </Card>
    </div>
  );
}
