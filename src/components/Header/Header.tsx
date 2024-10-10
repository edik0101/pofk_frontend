"use client";

import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { Button } from "../ui/button";
import { CircleUserRoundIcon, MoveRightIcon } from "lucide-react";
import { useSideBar } from "@/providers/SideBarContext/SideBarContext";
import { PAGES_HEADER } from "../../data/pages";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/types";

export default function Header() {
  const { toggleSideBar } = useSideBar();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/auth/user");
        const data = await res.json();
        if (data.success) setUser(data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("access_token");
    router.push("/login");
  };

  return isLoading ? (
    <header className="grid h-[76px] w-full grid-flow-col items-center rounded-3xl bg-white px-4 py-5 lg:px-[23px]"></header>
  ) : (
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
      {user !== null && (
        <div className="flex items-center gap-5 text-xl">
          <CircleUserRoundIcon />
          {`${user.LastName || ""} ${user.FirstName ? user.FirstName.charAt(0) : ""}`}
        </div>
      )}
      <div className="flex flex-wrap gap-2 justify-self-end">
        {user ? (
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        ) : (
          <>
            <Button asChild variant="default" className="rounded-2xl">
              <Link href={`/${PAGES_HEADER[0].path}`}>
                {PAGES_HEADER[0].name}
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="rounded-2xl text-white"
            >
              <Link href={`/${PAGES_HEADER[1].path}`}>
                {PAGES_HEADER[1].name}
              </Link>
            </Button>
          </>
        )}
        <Button
          asChild
          variant={user ? "secondary" : "outline"}
          className={`rounded-2xl ${user ? "text-white" : ""}`}
        >
          <Link href={`/${PAGES_HEADER[2].path}`}>
            {PAGES_HEADER[2].name}
            <MoveRightIcon className="ml-1 size-2.5" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
