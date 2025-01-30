import {IsDefault} from "@/components/Views/Table/components/Columns/is-default";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";

export const projectColumns = [
  {id: 'title', title: 'Title', isLink: true},
  {id: 'alias', title: 'Alias'},
  {id: 'description', title: 'Description'},
  {
    id: 'isDefault',
    title: 'Default',
    className: 'w-[80px]',
    renderValue: IsDefault,
  },
  {
    id: 'delete',
    title: '',
    className: 'w-[40px]',
    align: 'center',
    renderValue: DeleteAction
  },
]