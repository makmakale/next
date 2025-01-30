import {PRIORITY_CREATE_PAGE, PRIORITY_EDIT_PAGE, PRIORITY_LIST_PAGE} from "@/lib/constants";
import {ROUTES} from "@/lib/utils/constants/routes";
import {
  createPriority,
  deletePriority,
  getListOfPriorities,
  getPriorityById,
  setDefaultPriority,
  updatePriority
} from "@/lib/actions/priorities";
import {priorityColumns} from "@/lib/pages/columns";
import {TaskPrioritySchema} from "@/lib/form/validation";

const pathname = ROUTES.priorities

export const priorityConfig = {
  table: {
    pageTitle: PRIORITY_LIST_PAGE,
    searchLabel: 'Search for priorities...',
    columns: priorityColumns,
    getData: getListOfPriorities,
    setDefault: setDefaultPriority,
    onDelete: deletePriority,
  },
  create: {
    isCreateMode: true,
    pageTitle: PRIORITY_CREATE_PAGE,
    validationSchema: TaskPrioritySchema,
    submitAction: createPriority,
    redirectPath: pathname
  },
  edit: id => ({
    isEditMode: true,
    pageTitle: PRIORITY_EDIT_PAGE,
    getData: () => getPriorityById(id),
    validationSchema: TaskPrioritySchema,
    submitAction: values => updatePriority(values, id),
    redirectPath: pathname
  })
}