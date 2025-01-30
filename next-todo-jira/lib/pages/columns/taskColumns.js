import TaskKey from "@/components/Views/Table/components/Columns/task-key";
import TaskTitleColumn from "@/components/Views/Table/components/Columns/task-title";
import PriorityColumn from "@/components/Views/Table/components/Columns/priority";
import DateColumn from "@/components/Views/Table/components/Columns/date";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";
import TaskStatusColumn from "@/components/Views/Table/components/Columns/task-status";

export const taskColumns = [
  {
    id: 'id',
    title: 'Task',
    className: 'w-[100px]',
    renderValue: TaskKey,
  },
  {id: 'title', title: 'Title', className: 'min-w-[300px]', renderValue: TaskTitleColumn},
  {id: 'status.title', title: 'Status', renderValue: TaskStatusColumn},
  {id: 'priority.title', title: 'Priority', renderValue: PriorityColumn},
  {id: 'assignee.name', title: 'Assignee'},
  {id: 'createdAt', title: 'Created Date', className: 'min-w-[150px]', renderValue: DateColumn},
  {id: 'reporter.name', title: 'Reporter'},
  {
    id: 'delete',
    title: '',
    className: 'w-[40px]',
    align: 'center',
    renderValue: DeleteAction,
  },
];