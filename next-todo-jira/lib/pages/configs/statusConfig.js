import {STATUS_CREATE_PAGE, STATUS_EDIT_PAGE, STATUS_LIST_PAGE} from "@/lib/constants";
import {ROUTES} from "@/lib/utils/constants/routes";
import {StatusSchema} from "@/lib/form/validation";
import {
  createStatus,
  deleteStatus,
  getListOfStatuses,
  getStatusById,
  setDefaultStatus,
  updateStatus
} from "@/lib/actions/statuses";
import {statusColumns} from "@/lib/pages/columns";

const pathname = ROUTES.statuses

export const statusConfig = {
  table: {
    pageTitle: STATUS_LIST_PAGE,
    searchLabel: 'Search for statuses...',
    columns: statusColumns,
    getData: getListOfStatuses,
    setDefault: setDefaultStatus,
    onDelete: deleteStatus,
  },
  create: {
    isCreateMode: true,
    pageTitle: STATUS_CREATE_PAGE,
    validationSchema: StatusSchema,
    submitAction: createStatus,
    redirectPath: pathname
  },
  edit: id => ({
    isEditMode: true,
    pageTitle: STATUS_EDIT_PAGE,
    getData: () => getStatusById(id),
    validationSchema: StatusSchema,
    submitAction: values => updateStatus(values, id),
    redirectPath: pathname
  })
}