import { PlusIcon } from "lucide-react";
import Heading from "@/components/Heading/Heading";
import SimpleTable from "@/components/Tables/SimpleTable/SimpleTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FetchedRole, FetchedUser } from "@/types/types";
import { getRoles, getUsers } from "@/lib/users";
import ChangeRoleBtn from "./Buttons/ChangeRoleBtn";
import ChangeAccessBtn from "./Buttons/ChangeAccessBtn";

const EmployeeListColumns = ["Имя", "Почта", "Роль", "", ""];

export default async function Users() {
  const users: FetchedUser[] | null = (await getUsers()) || null;
  const roles: FetchedRole[] | null = (await getRoles()) || null;
  const rolesNames = roles?.map((role) => role.Name);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <Heading text="Подключенные сотрудники" headingLvl={2} />
        <Button
          variant="outline"
          className="h-14 rounded-3xl border border-black bg-transparent"
        >
          <PlusIcon className="mr-2" /> Добавить сотрудника
        </Button>
      </div>
      <Card className="mt-5 rounded-3xl bg-white p-4">
        {users && (
          <SimpleTable
            data={users.map((user) => ({
              name: user.FirstName + " " + user.LastName,
              email: user.Email,
              role: user.Roles.join(" "),
              changeRoleBtn: (
                <ChangeRoleBtn
                  rolesNames={rolesNames || [""]}
                  userEmail={user.Email}
                />
              ),
              closeAccessBtn: (
                <ChangeAccessBtn
                  isActive={user.IsActive}
                  userEmail={user.Email}
                />
              ),
            }))}
            columnsHeaders={EmployeeListColumns}
          />
        )}
      </Card>
    </div>
  );
}
