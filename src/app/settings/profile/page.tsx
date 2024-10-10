import InstructionsButton from "@/components/Buttons/Instructions/Instructions";
import ProfileForm from "@/components/Forms/ProfileForm/ProfileForm";
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

export default function Profile() {
  return (
    <div>
      <div className="flex items-baseline gap-5">
        <Heading text="Личные данные" headingLvl={2} />
        <InstructionsButton />
      </div>
      <Card className="rounded-3xl bg-white p-4">
        <ProfileForm />
      </Card>
      <Heading text="Информация по тарифу" headingLvl={2} />
      <Card className="rounded-3xl bg-white p-4">
        <SimpleTable data={TarifTableData} />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
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
    </div>
  );
}
