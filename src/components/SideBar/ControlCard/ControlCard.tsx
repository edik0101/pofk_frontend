import Link from "next/link";
import { Settings, NotebookPen, Clipboard, BookText, User } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/accordion";
import {
  PAGES_REPORTS,
  PAGES_DATA_INPUT,
  PAGES_KNOWLEDGE,
  PAGES_SETTINGS,
  PAGES_PROFILE,
} from "@/data/pages";

const ACCORDION = [
  {
    value: "settings",
    name: "Настройки",
    icon: <Settings className="h-5 w-5" />,
    links: PAGES_SETTINGS,
  },
  {
    value: "data-input",
    name: "Внесение данных",
    icon: <NotebookPen className="size-4" />,
    links: PAGES_DATA_INPUT,
  },
  {
    value: "reports",
    name: "Отчеты",
    icon: <Clipboard className="size-4" />,
    links: PAGES_REPORTS,
  },
  {
    value: "knowledge-base",
    name: "База знаний",
    icon: <BookText className="size-4" />,
    links: PAGES_KNOWLEDGE,
  },
];

export default function ControlCard({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full justify-between gap-4 rounded-md border-b-0"
    >
      <Link
        href={PAGES_PROFILE[0].path}
        prefetch={false}
        className="flex items-center gap-2 px-3 py-4 hover:underline"
      >
        <User className="size-4" />
        Профиль
      </Link>
      {ACCORDION.map((el) => (
        <AccordionItem
          key={el.value}
          value={el.value}
          className="mb-2 flex-1 rounded-md border-b-0 bg-slate-800 px-3"
        >
          <AccordionTrigger onClick={() => setIsCollapsed(false)}>
            <span className="flex items-center gap-2">
              {el.icon}
              {!isCollapsed && <span>{el.name}</span>}
            </span>
          </AccordionTrigger>
          {!isCollapsed && (
            <AccordionContent>
              {el.links.map((link, i) => (
                <Link
                  key={link.path}
                  href={`/${el.value}/${link.path}`}
                  prefetch={false}
                  className={`block border-slate-500 py-2 ${
                    i === el.links.length - 1
                      ? "border-b lg:border-b-0"
                      : "border-b"
                  } text-slate-500 hover:text-white max-lg:w-[calc(50%-16px)] max-sm:w-full`}
                >
                  {link.name}
                </Link>
              ))}
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
