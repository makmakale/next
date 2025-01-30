import {get} from "@/lib/utils/data";
import {Badge} from "@/components/ui/badge";
import EditLink from "@/components/ui/edit-link";

const TaskTitle = ({row, col}) => {
  const label = get(row, 'type.title')
  const bg = get(row, 'type.color')
  const taskTitle = get(row, col.id)

  if (!taskTitle) return '???'

  return (
    <div className="flex items-center space-x-2">
      {label && <Badge variant="outline" className="text-white h-fit" style={{backgroundColor: bg}}>{label}</Badge>}

      <EditLink id={row.id} title={taskTitle}/>
    </div>
  )
}

export default TaskTitle