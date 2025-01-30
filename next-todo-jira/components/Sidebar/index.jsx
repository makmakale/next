import Link from "next/link";

import {BookCopy, Columns3, LayoutDashboard, LayoutList, ListOrdered, SendToBack, Users} from 'lucide-react';
import {ROUTES} from "@/lib/utils/constants/routes";

const menuItems = [
  {
    group: "Board",
    items: [
      {
        link: '/',
        text: 'Board',
        icon: LayoutDashboard
      },
      {
        link: '/projects',
        text: 'Projects',
        icon: BookCopy
      },
      {
        link: ROUTES.tasks,
        text: 'Tasks',
        icon: ListOrdered
      },
      {
        link: '/users',
        text: 'Users',
        icon: Users
      },
    ],
  },
  {
    group: "Settings",
    items: [

      {
        link: '/statuses',
        text: 'Statuses',
        icon: Columns3
      },
      {
        link: '/types',
        text: 'Types',
        icon: LayoutList
      },
      {
        link: '/priorities',
        text: 'Priorities',
        icon: SendToBack
      },
    ]
  }
]

const Sidebar = ({onClose}) => {
  return (
    <div className="w-full lg:w-[300px]">
      {menuItems.map((menu, key) => {
        if (menu.group) {
          return (
            <div key={key}>
              <h2 className="my-2 px-2 text-lg font-semibold tracking-tight">
                {menu.group}
              </h2>
              <ul>
                {menu.items.map((option, optionKey) =>
                  <MenuItem key={optionKey} item={option} onClick={onClose}/>
                )}
              </ul>
            </div>
          )
        }

        return <MenuItem key={key} item={menu}/>
      })}
    </div>
  );
};

function MenuItem({item, onClick}) {
  const Icon = item.icon

  return (
    <li className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700" onClick={onClick}>
      <Link className="w-full flex items-center space-x-4 px-6 py-4" href={item.link} prefetch>
        {Icon && <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400"/>}
        <span className="text-sm font-medium">{item.text}</span>
      </Link>
    </li>
  )
}

export default Sidebar;