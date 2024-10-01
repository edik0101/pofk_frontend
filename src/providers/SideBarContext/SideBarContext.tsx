"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const SideBarContext = createContext<{
  isOpen: boolean;
  toggleSideBar: () => void;
}>({
  isOpen: false,
  toggleSideBar: () => {},
});

export function SideBarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SideBarContext.Provider value={{ isOpen, toggleSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
}

export function useSideBar() {
  return useContext(SideBarContext);
}
