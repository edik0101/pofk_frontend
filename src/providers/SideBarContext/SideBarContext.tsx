"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const SideBarContext = createContext<{
  isOpen: boolean;
  toggleSideBar: () => void;
  isCollapsed: boolean;
  toggleCollapsed: (value?: boolean) => void;
}>({
  isOpen: false,
  toggleSideBar: () => {},
  isCollapsed: false,
  toggleCollapsed: () => {},
});

export function SideBarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSideBar = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleCollapsed = (value?: boolean) => {
    if (typeof value === "boolean") {
      setIsCollapsed(value);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <SideBarContext.Provider
      value={{ isOpen, toggleSideBar, isCollapsed, toggleCollapsed }}
    >
      {children}
    </SideBarContext.Provider>
  );
}

export function useSideBar() {
  return useContext(SideBarContext);
}
