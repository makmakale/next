'use client'
import {Menu, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import Sidebar from "@/components/Sidebar";

import {Drawer, DrawerClose, DrawerContent, DrawerFooter,} from "@/components/ui/drawer"

export default function SideBarToggle(props) {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <Drawer direction="bottom" open={open}>
      <Button variant="ghost" className="block md:hidden" onClick={() => setOpen(open => !open)}>
        <Menu/>
      </Button>
      <DrawerContent>
        <Sidebar onClose={onClose}/>

        <DrawerFooter>
          <DrawerClose>
            <Button variant="ghost" onClick={onClose}>
              <X/>
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}