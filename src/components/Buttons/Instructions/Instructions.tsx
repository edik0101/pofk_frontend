import { Button } from "@/components/ui/button";
import { BookTextIcon } from "lucide-react";

export default function InstructionsButton() {
  return (
    <Button
      variant="default"
      className="group h-10 rounded-3xl bg-slate-800 text-base"
    >
      <BookTextIcon
        fill="white"
        className="mr-2 text-slate-800 group-hover:text-primary"
      />
      <span>Инструкции</span>
    </Button>
  );
}
