import {Droppable} from "@hello-pangea/dnd";
import {cn} from "@/lib/utils/utils";
import styles from "@/components/pages/board/board.module.css";
import Task from "@/components/pages/board/components/Task";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CirclePlus} from "lucide-react";

export default function TaskList({column}) {
  return (
    <Droppable droppableId={column.id.toString()} type="task">
      {(provided, snapshot) => (
        <>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(styles.task_list, snapshot.isDraggingOver ? 'bg-amber-200/50' : 'bg-primary-foreground')}
          >
            {column.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index}/>
            ))}

            {provided.placeholder}
          </div>

          {column.addTask ? (
            <Button variant="outline" asChild className="mx-2">
              <Link href={`/tasks/create?statusId=${column.id}`} prefetch>
                <CirclePlus className="w-4 h-4 mr-2"/> Add New Task
              </Link>
            </Button>
          ) : null}
        </>
      )}
    </Droppable>
  );
}