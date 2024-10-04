"use client";

import { useSideBar } from "@/providers/SideBarContext/SideBarContext";

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSideBar();

  return (
    <div
      className={`${isCollapsed ? "lg:w-mainWidthCollapsed" : "lg:w-mainWidth"} w-full px-5 py-6 lg:ml-auto`}
    >
      {children}
    </div>
  );
}
