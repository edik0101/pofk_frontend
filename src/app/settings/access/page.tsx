import InstructionsButton from "@/components/Buttons/Instructions/Instructions";
import Heading from "@/components/Heading/Heading";
import SimpleTable from "@/components/Tables/SimpleTable/SimpleTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AccessRightsColumns = ["Роль", "Доступ", ""];
const AccessRightsData = [
  {
    role: "Операционист",
    access: "Полный",
    button: (
      <Button
        variant="outline"
        className="h-12 rounded-3xl border-primary px-8 text-base text-primary"
      >
        Изменить доступы
      </Button>
    ),
  },
  {
    role: "Финансист",
    access: "Частичный",
    button: (
      <Button
        variant="outline"
        className="h-12 rounded-3xl border-primary px-8 text-base text-primary"
      >
        Изменить доступы
      </Button>
    ),
  },
  {
    role: "Ассистент",
    access: "Частичный",
    button: (
      <Button
        variant="outline"
        className="h-12 rounded-3xl border-primary px-8 text-base text-primary"
      >
        Изменить доступы
      </Button>
    ),
  },
];

export default function AccessSettings() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-5">
        <Heading text="Права доступа" />
        <InstructionsButton />
      </div>
      <Card className="mt-5 rounded-3xl p-4">
        <SimpleTable
          data={AccessRightsData}
          columnsHeaders={AccessRightsColumns}
        ></SimpleTable>
      </Card>
    </div>
  );
}
