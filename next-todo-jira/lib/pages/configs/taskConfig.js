import {TASK_CREATE_PAGE, TASK_EDIT_PAGE, TASK_LIST_PAGE} from "@/lib/constants";
import {ROUTES} from "@/lib/utils/constants/routes";
import {createTask, deleteTask, getListOfTasks, getOptionsForTask, getTaskById, updateTask} from "@/lib/actions/tasks";
import {TaskSchema} from "@/lib/form/validation";
import {taskColumns} from "@/lib/pages/columns";

const pathname = ROUTES.tasks

export const taskConfig = {
  table: {
    pageTitle: TASK_LIST_PAGE,
    searchLabel: 'Search for task...',
    columns: taskColumns,
    getData: getListOfTasks,
    onDelete: deleteTask,
  },
  create: {
    isCreateMode: true,
    pageTitle: TASK_CREATE_PAGE,
    validationSchema: TaskSchema,
    getOptions: getOptionsForTask,
    submitAction: createTask,
    redirectPath: pathname
  },
  edit: id => ({
    isEditMode: true,
    pageTitle: TASK_EDIT_PAGE,
    validationSchema: TaskSchema,
    getData: () => getTaskById(id),
    getOptions: getOptionsForTask,
    submitAction: values => updateTask(values, id),
    redirectPath: pathname
  })
}