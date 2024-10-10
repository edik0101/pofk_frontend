"use client";

import { LockOpenIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ChangeAccessBtn({
  isActive,
  userEmail,
}: {
  isActive: boolean;
  userEmail: string;
}) {
  const [isUserActive, setIsUserActive] = useState(isActive);
  const handleClick = () => {
    setIsUserActive(!isUserActive);
    console.log("Новое состояние юзера ", userEmail, " ", isUserActive);
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className={`h-12 rounded-3xl border-none bg-transparent text-base ${isUserActive ? "text-slate-500" : "text-secondary"} shadow-none`}
    >
      {isUserActive ? (
        <X size={10} strokeWidth={2} className="mr-1" />
      ) : (
        <LockOpenIcon size={10} strokeWidth={2} className="mr-1" />
      )}
      <span>{isUserActive ? "Закрыть доступ" : "Открыть доступ"} </span>
    </Button>
  );
}
