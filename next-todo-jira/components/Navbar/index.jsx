import {AppName} from "@/lib/constants";
import Link from "next/link";
import {ModeToggle} from "@/components/ModeToggle";
import UserMenu from "@/components/Navbar/UserMenu";
import {getSessionUser} from "@/lib/utils/users";
import SideBarToggle from "@/components/Navbar/SideBarToggle";

export default async function Navbar() {
  const user = await getSessionUser()

  return (
    <header className="border-b border-b-gray-300 dark:border-b-gray-800 p-4 flex items-center">
      <h1 className="font-bold hidden sm:block">
        <Link href="/">{AppName}</Link>
      </h1>
      <SideBarToggle/>

      <div className="ml-auto flex gap-4">
        <ModeToggle/>
        {user && <UserMenu user={user}/>}
      </div>
    </header>
  );
};