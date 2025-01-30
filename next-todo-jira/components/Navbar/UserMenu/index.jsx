'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar} from "@/components/ui/avatar"
import {LogOut} from "lucide-react";
import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import Image from "next/image";

const UserMenu = ({user = {}}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={user.image || '/images/noavatar.png'}
            width={36}
            height={36}
            alt={user.name || 'Avatar'}
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>My Tasks</DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={() => signOut({callbackUrl: '/login'})}>
          <LogOut size={16} className="mr-2"/> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;