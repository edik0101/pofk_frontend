import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { PAGES_CONTACT_CARD } from "@/data/pages";

export default function ContactsCard() {
  return (
    <Card className="border-none bg-inherit p-4 text-sm text-white">
      <CardHeader className="mb-9 p-0">
        <CardTitle>Техническая поддержка</CardTitle>
      </CardHeader>
      <CardContent className="w-full gap-5 p-0">
        <div className="flex-wrap gap-4">
          <div className="flex flex-wrap gap-x-10 sm:mb-3">
            <div className="mb-3">
              <div className="text-xs text-slate-500">Номер поддержки:</div>
              <a href="tel:+79999999999">8 (999) 999-99-99</a>
            </div>
            <div>
              <div className="text-xs text-slate-500">Почта поддержки:</div>
              <a href="mailto:pf1@werthesest.ru">pf1@werthesest.ru</a>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Часы работы:</div>
            <div>Пн - Пт с 9:00 до 19:00 мск</div>
          </div>
        </div>
        <div className="flex-1 flex-wrap max-lg:flex sm:gap-4 lg:mt-6">
          {PAGES_CONTACT_CARD.map((page, i) => (
            <Link
              key={page.path}
              href={`/${page.path}`}
              prefetch={false}
              className={`block border-slate-500 py-2 ${
                i === PAGES_CONTACT_CARD.length - 1
                  ? "border-b lg:border-b-0"
                  : "border-b"
              } w-full text-slate-500 hover:text-white`}
            >
              {page.name}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
