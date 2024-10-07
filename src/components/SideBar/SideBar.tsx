/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  PanelRightOpenIcon,
  PanelRightCloseIcon,
  MessageCircleMore,
  X,
} from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import ContactsCard from "./ContactsCard/ContactsCard";
import ControlCard from "./ControlCard/ControlCard";
import { useSideBar } from "@/providers/SideBarContext/SideBarContext";

function useWindowSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function SideBar() {
  const [isAuth, setIsAuth] = useState(true);
  const { isOpen, toggleSideBar, isCollapsed, toggleCollapsed } = useSideBar();
  const width = useWindowSize();

  useEffect(() => {
    if (width < 1024) {
      if (isCollapsed) toggleCollapsed(false);
      if (isOpen) toggleSideBar();
    } else if (width >= 1024 && !isOpen) {
      toggleSideBar();
    }
  }, [width]);

  useEffect(() => {
    document.body.style.overflow = isOpen && width < 1024 ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <aside
        className={`fixed h-full min-h-screen overflow-y-auto ${
          isCollapsed ? "w-sideBarWidthCollapsed" : "w-sideBarWidth"
        } ${isOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"} transition-width z-30 mr-1 flex flex-col gap-2 bg-gray-900 p-3 pt-5 text-white duration-300 max-lg:absolute`}
      >
        <div className="flex w-full items-center justify-between">
          {!isCollapsed && (
            <p className="flex items-center text-lg">
              <span className="block rounded-md bg-primary p-1 leading-4">
                ФИН
              </span>
              <span className="block p-1">Контроль</span>
            </p>
          )}
          <Button
            onClick={() => toggleCollapsed(!isCollapsed)}
            variant="ghost"
            size="icon"
            className="m-2 hidden self-end bg-inherit p-2 hover:opacity-80 lg:block"
          >
            {isCollapsed ? (
              <PanelRightCloseIcon className="h-5 w-5" />
            ) : (
              <PanelRightOpenIcon className="h-5 w-5" />
            )}
          </Button>
          <Button
            onClick={toggleSideBar}
            variant="ghost"
            size="icon"
            className="lg:hidden"
          >
            <X />
          </Button>
        </div>

        {isAuth ? (
          <ControlCard
            isCollapsed={isCollapsed}
            setIsCollapsed={toggleCollapsed}
          />
        ) : (
          <div
            className={`flex flex-col items-center justify-center gap-4 rounded-3xl bg-slate-800 px-2 ${!isCollapsed ? "py-10" : "py-2"} text-center text-base`}
          >
            <Image
              src="/icons/user_icon.svg"
              alt="user icon"
              width={48}
              height={48}
            />
            {!isCollapsed && (
              <p>
                <Link href={"/login"} className="text-secondary">
                  Войдите
                </Link>{" "}
                или{" "}
                <Link href={"/register"} className="text-primary">
                  зарегистрируйтесь
                </Link>{" "}
                чтобы начать работу
              </p>
            )}
          </div>
        )}

        {!isCollapsed && <ContactsCard />}
        <Link
          href={"mailto:pf1@werthesest.ru"}
          className={
            buttonVariants({ variant: "default" }) +
            `${isCollapsed ? "w-min" : "w-full"} rounded-2xl py-2`
          }
          style={{ backgroundColor: "#2563eb" }}
        >
          <MessageCircleMore className="mr-1 size-4" />
          {!isCollapsed && <span>Связаться с нами</span>}
        </Link>
      </aside>
      {isOpen && (
        <div
          className="absolute z-20 h-screen w-screen bg-gray-400 opacity-60 lg:hidden"
          onClick={toggleSideBar}
        ></div>
      )}
    </>
  );
}
