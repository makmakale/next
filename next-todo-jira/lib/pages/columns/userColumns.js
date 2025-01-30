import AvatarColumn from "@/components/Views/Table/components/Columns/avatar";
import Role from "@/components/Views/Table/components/Columns/role";
import DateColumn from "@/components/Views/Table/components/Columns/date";
import DisableAction from "@/components/Views/Table/components/Columns/disable-action";

export const userColumns = [
  {
    id: 'image',
    title: 'Avatar',
    className: 'w-[60px]',
    renderValue: AvatarColumn
  },
  {id: 'name', title: 'Name', isLink: true},
  {id: 'username', title: 'Username'},
  {id: 'email', title: 'email'},
  {
    id: 'isAdmin',
    title: 'Role',
    className: 'w-[80px]',
    renderValue: Role
  },
  {
    id: 'createdAt',
    title: 'Registered',
    className: 'min-w-[150px]',
    renderValue: DateColumn
  },
  {
    id: 'isActive',
    title: 'Status',
    className: 'w-[40px]',
    align: 'center',
    renderValue: (colProps) => <DisableAction {...colProps}/>
  },
]