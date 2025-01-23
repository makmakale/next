"use client";

import { FaTable } from "react-icons/fa6";
import { IoGridSharp } from "react-icons/io5";
import { CurrentUserProps, UserProps } from "@/lib/types/users";
import { cn } from "@/lib/utils";
import TableView from "@/components/users/views/table";
import GridView from "@/components/users/views/grid";
import { useSearchParams } from "next/navigation";
import { useClientSearchParams } from "@/hooks/useClientSearchParams";

export default function UsersPageView({
  users,
  error,
  currentUser,
}: {
  users: UserProps[] | null | undefined;
  error: string | undefined;
  currentUser: CurrentUserProps;
}) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "table";
  const setSearchLink = useClientSearchParams();

  const onViewChange = (newView: "table" | "grid") => {
    setSearchLink("view", newView);
  };

  if (error) {
    return <div className="text-error">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="join w-full justify-end">
        <button
          className={cn("btn join-item", view === "table" && "btn-primary")}
          onClick={() => onViewChange("table")}
        >
          <FaTable />
        </button>
        <button
          className={cn("btn join-item", view === "grid" && "btn-primary")}
          onClick={() => onViewChange("grid")}
        >
          <IoGridSharp />
        </button>
      </div>

      {view === "table" ? (
        <TableView users={users} />
      ) : view === "grid" ? (
        <GridView users={users} currentUser={currentUser} />
      ) : null}
    </div>
  );
}
