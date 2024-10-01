"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { MoveRightIcon } from "lucide-react";
import { useSideBar } from "@/providers/SideBarContext/SideBarContext";

export default function Header() {
  const { toggleSideBar } = useSideBar();

  return (
    <header className="grid w-full grid-flow-col items-center rounded-3xl bg-white px-4 py-5 lg:px-[23px]">
      <Button
        variant="ghost"
        onClick={toggleSideBar}
        className="h-[31px] w-[52px] p-2 lg:hidden"
      >
        <Image
          src="/icons/burger_menu.svg"
          alt="menu icon"
          width={52}
          height={31}
        />
      </Button>
      <div className="flex flex-wrap gap-2 justify-self-end">
        <Button asChild variant="default" className="rounded-2xl bg-blue-600">
          <Link href="/register">Регистрация</Link>
        </Button>
        <Button asChild variant="secondary" className="rounded-2xl text-white">
          <Link href="/login">Вход</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/about-us">
            О нас <MoveRightIcon className="ml-1 size-2.5" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
