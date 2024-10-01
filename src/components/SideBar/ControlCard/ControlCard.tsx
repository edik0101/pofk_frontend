import Link from "next/link";
import { Settings, NotebookPen, Clipboard, BookText } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/accordion";

const ACCORDION = [
  {
    value: "settings",
    name: "Настройки",
    icon: <Settings className="h-5 w-5" />,
    links: [
      {
        name: "Настройки статей",
        path: "articles-settings",
      },
      {
        name: "Настройки прав доступа",
        path: "access-settings",
      },
      {
        name: "Настройки личного кабинета",
        path: "personal-settings",
      },
    ],
  },
  {
    value: "Data Input",
    name: "Внесение данных",
    icon: <NotebookPen className="size-4" />,
    links: [
      {
        name: "Журнал операций",
        path: "journal",
      },
      {
        name: "Себестоимость",
        path: "cost",
      },
      {
        name: "Самовыкупы",
        path: "self-purchase",
      },
      {
        name: "Финансовый отчет ВБ",
        path: "WB-financial-reports",
      },
    ],
  },
  {
    value: "Reports",
    name: "Отчеты",
    icon: <Clipboard className="size-4" />,
    links: [
      {
        name: "ДДС",
        path: "dds",
      },
      {
        name: "ОПиУ",
        path: "opiu",
      },
      {
        name: "АВС",
        path: "abc",
      },
      {
        name: "Остатки",
        path: "balance",
      },
      {
        name: "Отчет по заказам",
        path: "order-report",
      },
      {
        name: "Сверка",
        path: "comparison",
      },
    ],
  },
  {
    value: "Knowledge Base",
    name: "База знаний",
    icon: <BookText className="size-4" />,
    links: [
      {
        name: "Внесение данных",
        path: "data-input",
      },
      {
        name: "Отчеты",
        path: "reports",
      },
    ],
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
                  href={`/${link.path}`}
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
