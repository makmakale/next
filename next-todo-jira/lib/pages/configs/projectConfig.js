import {PROJECT_CREATE_PAGE, PROJECT_EDIT_PAGE, PROJECT_LIST_PAGE} from "@/lib/constants";
import {ROUTES} from "@/lib/utils/constants/routes";
import {ProjectSchema} from "@/lib/form/validation";
import {
  createProject,
  deleteProject,
  getListOfProjects,
  getProjectById,
  setDefaultProject,
  updateProject
} from "@/lib/actions/projects";
import {projectColumns} from "@/lib/pages/columns";

const pathname = ROUTES.projects

export const projectConfig = {
  table: {
    pageTitle: PROJECT_LIST_PAGE,
    searchLabel: 'Search for projects...',
    columns: projectColumns,
    getData: getListOfProjects,
    setDefault: setDefaultProject,
    onDelete: deleteProject,
  },
  create: {
    isCreateMode: true,
    pageTitle: PROJECT_CREATE_PAGE,
    validationSchema: ProjectSchema,
    submitAction: createProject,
    redirectPath: pathname
  },
  edit: id => ({
    isEditMode: true,
    pageTitle: PROJECT_EDIT_PAGE,
    getData: () => getProjectById(id),
    validationSchema: ProjectSchema,
    submitAction: values => updateProject(values, id),
    redirectPath: pathname
  })
}