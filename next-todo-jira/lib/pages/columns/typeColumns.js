import {ColorColumn} from "@/components/Views/Table/components/Columns/color";
import {IsDefault} from "@/components/Views/Table/components/Columns/is-default";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";

export const typeColumns = [
  {id: 'title', title: 'Title', isLink: true},
  {id: 'alias', title: 'Alias'},
  {id: 'description', title: 'Description'},
  {
    id: 'color',
    title: 'Color',
    className: "w-[80px] text-center",
    renderValue: ColorColumn
  },
  {
    id: 'isDefault',
    title: 'Default',
    className: 'w-[80px]',
    align: 'center',
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