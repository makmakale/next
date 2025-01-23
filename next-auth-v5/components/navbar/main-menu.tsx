import MenuItems from "@/components/navbar/menu-items";
import { CurrentUserProps } from "@/lib/types/users";

export default function MainMenu({ user }: { user: CurrentUserProps }) {
  if (!user) return null;

  return (
    <div className="navbar-center flex">
      <ul className="menu menu-horizontal px-1 space-x-2">
        <MenuItems />
      </ul>
    </div>
  );
}
