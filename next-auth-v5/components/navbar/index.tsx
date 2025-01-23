import Link from "next/link";
import UserMenu from "@/components/navbar/user-menu";
import MainMenu from "@/components/navbar/main-menu";
import { getCurrentUser } from "@/lib/utils/data/users";

export default async function Navbar() {
  const currentUser = await getCurrentUser();

  return (
    <div className="navbar bg-base-100 mb-8 rounded-lg shadow-md p-4">
      <div className="navbar-start">
        <Link href={"/"} className="btn btn-ghost text-xl">
          NextAuth5
        </Link>
      </div>

      <MainMenu user={currentUser} />

      <UserMenu user={currentUser} />
    </div>
  );
}
