import {USER_CREATE_PAGE, USER_EDIT_PAGE, USER_LIST_PAGE} from "@/lib/constants";
import {ROUTES} from "@/lib/utils/constants/routes";
import {RegisterSchema, UpdateUserSchema} from "@/lib/form/validation";
import {createUser, disableUser, getListOfUsers, getUserDetails, updateUser} from "@/lib/actions/users";
import {userColumns} from "@/lib/pages/columns";

const pathname = ROUTES.users

export const userConfig = {
  table: {
    pageTitle: USER_LIST_PAGE,
    searchLabel: 'Search for users...',
    columns: userColumns,
    getData: getListOfUsers,
    onDelete: disableUser,
  },
  create: {
    isCreateMode: true,
    pageTitle: USER_CREATE_PAGE,
    validationSchema: RegisterSchema,
    submitAction: createUser,
    redirectPath: pathname
  },
  edit: id => ({
    isEditMode: true,
    pageTitle: USER_EDIT_PAGE,
    getData: () => getUserDetails(id),
    validationSchema: UpdateUserSchema,
    submitAction: values => updateUser(values, id),
    redirectPath: pathname
  })
}