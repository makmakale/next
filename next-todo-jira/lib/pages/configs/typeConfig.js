import {TYPE_CREATE_PAGE, TYPE_EDIT_PAGE, TYPE_LIST_PAGE} from "@/lib/constants";
import {ROUTES} from "@/lib/utils/constants/routes";
import {TaskTypeSchema} from "@/lib/form/validation";
import {createType, deleteType, getListOfTypes, getTypeById, setDefaultType, updateType} from "@/lib/actions/types";
import {typeColumns} from "@/lib/pages/columns";

const pathname = ROUTES.types

export const typeConfig = {
  table: {
    pageTitle: TYPE_LIST_PAGE,
    searchLabel: 'Search for types...',
    columns: typeColumns,
    getData: getListOfTypes,
    setDefault: setDefaultType,
    onDelete: deleteType,
  },
  create: {
    isCreateMode: true,
    pageTitle: TYPE_CREATE_PAGE,
    validationSchema: TaskTypeSchema,
    submitAction: createType,
    redirectPath: pathname
  },
  edit: id => ({
    isEditMode: true,
    pageTitle: TYPE_EDIT_PAGE,
    getData: () => getTypeById(id),
    validationSchema: TaskTypeSchema,
    submitAction: values => updateType(values, id),
    redirectPath: pathname
  })
}