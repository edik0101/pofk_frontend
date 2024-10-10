"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChangeRoleBtn({
  rolesNames,
  userEmail,
}: {
  rolesNames: string[];
  userEmail: string;
}) {
  const handleRoleChange = (value: string) => {
    console.log("Новая роль юзера ", userEmail, "", value);
  };

  return (
    <Select onValueChange={handleRoleChange}>
      <SelectTrigger className="h-12 rounded-3xl border border-primary bg-transparent text-base text-primary">
        <SelectValue placeholder="Поменять роль" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Роли</SelectLabel>
          {rolesNames?.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
