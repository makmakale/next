"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { signOut } from "next-auth/react";
import UserAvatar from "@/components/common/user-avatar";
import { CurrentUserProps } from "@/lib/types/users";

export default function UserMenu({ user }: { user: CurrentUserProps }) {
  if (!user) return null;

  return (
    <div className="navbar-end">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className={cn(
            "btn btn-ghost btn-circle avatar",
            !user.image && "bg-neutral text-neutral-content placeholder",
          )}
        >
          <UserAvatar name={user.name as string} image={user.image as string} />
        </div>

        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-32"
        >
          <li>
            <Link href={`/dashboard/users/${user.id}`}>Profile</Link>
          </li>
          <li>
            <button className="cursor-pointer" onClick={() => signOut()}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
