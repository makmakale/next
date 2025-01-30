'use client'
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useEffect, useState} from "react";
import {createSubTask} from "@/lib/actions/tasks";
import {Badge} from "@/components/ui/badge";
import StatusLabel from "@/components/app/status-label";
import UserAvatarName from "@/components/app/user-avatar-name";
import Link from "next/link";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";

export default function SubTasks({show}) {
  const [{options, data}] = useDetailsContext()
  const [subTasks, setSubTasks] = useState([])
  const defaultStatus = options?.status.find(status => status.isDefault)

  useEffect(() => {
    if (!data?.subTasks) return
    setSubTasks(data?.subTasks)
  }, [data?.subTasks]);

  const onAddSubtask = async () => {
    if (!data?.id) return

    const {data: task} = await createSubTask({
      parentId: data.id,
      projectId: data.projectId,
    })
    setSubTasks(prev => [...prev, task])
  }

  if (!show) return null

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <div className="font-bold">Subtasks</div>
        <div>
          <Button variant="ghost" onClick={onAddSubtask}>
            <Plus className="w-4 h-4 text-white"/>
          </Button>
        </div>
      </div>

      {subTasks.map(subTask => (
        <div key={subTask.id} className="border p-2 w-full flex items-center rounded-md gap-4">
          <Badge className="text-nowrap">
            {subTask.project?.alias}-{subTask.id}
          </Badge>

          <div className="w-full">
            <Link href={`/tasks/edit/${subTask.id}`} className="no-underline hover:underline" replace>
              {subTask.title}
            </Link>
          </div>

          <div className={'ml-auto border rounded-full py-1 px-2 flex items-center w-fit text-xs'}>
            <span className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{backgroundColor: subTask.priority?.color}}/>
            {subTask.priority?.title}
          </div>

          <UserAvatarName user={subTask.assignee} onlyAvatar withTooltip/>

          <StatusLabel status={subTask.status || defaultStatus}/>
        </div>
      ))}
    </>
  );
}