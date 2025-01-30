import {ROUTES} from "@/lib/utils/constants/routes";

import {projectConfig} from './projectConfig';
import {statusConfig} from './statusConfig';
import {taskConfig} from './taskConfig';
import {priorityConfig} from './priorityConfig';
import {typeConfig} from './typeConfig';
import {userConfig} from './userConfig';

export {projectConfig} from './projectConfig';
export {statusConfig} from './statusConfig';
export {taskConfig} from './taskConfig';
export {typeConfig} from './typeConfig';
export {priorityConfig} from './priorityConfig';
export {userConfig} from './userConfig';

export const getConfig = (route) => {
  switch (route) {
    case ROUTES.projects:
      return projectConfig

    case ROUTES.statuses:
      return statusConfig

    case ROUTES.tasks:
      return taskConfig

    case ROUTES.priorities:
      return priorityConfig

    case ROUTES.types:
      return typeConfig

    case ROUTES.users:
      return userConfig

    default:
      return null
  }
}