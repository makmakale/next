"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MenuItems() {
  const pathname = usePathname();

  return (
    <>
      <li>
        <Link
          href={"/dashboard"}
          className={pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          href={"/dashboard/users"}
          className={pathname === "/dashboard/users" ? "active" : ""}
        >
          Users
        </Link>
      </li>
    </>
  );
}
