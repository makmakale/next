import styles from "@/components/pages/board/board.module.css";
import {Draggable} from "@hello-pangea/dnd";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import Link from "next/link";
import UserWithTooltip from "@/components/pages/board/components/UserWithTooltip";
import TaskKey from "@/components/pages/board/components/TaskKey";
import TaskType from "@/components/pages/board/components/TaskType";
import TaskPriority from "@/components/pages/board/components/TaskPriority";

export default function Task({task, index}) {
  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.task}
        >
          <CardHeader>
            <CardTitle className={'text-lg'}>
              <Link
                href={`/tasks/edit/${task.id}`}
                className="underline hover:no-underline"
                prefetch
              >
                {task.title}
              </Link>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex justify-between">
            <div className="flex space-x-2">
              <TaskType task={task}/>
              <TaskPriority task={task}/>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <div className="ml-auto flex space-x-2 items-center">
              <TaskKey task={task}/>
              {task.assignee ? <UserWithTooltip user={task.assignee}/> : null}
            </div>
          </CardFooter>
        </Card>
      )}
    </Draggable>
  );
}