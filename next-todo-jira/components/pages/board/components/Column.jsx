import {Draggable} from "@hello-pangea/dnd";
import styles from "@/components/pages/board/board.module.css";
import TaskList from "@/components/pages/board/components/TaskList";

export default function Column({column, index}) {
  return (
    <Draggable draggableId={`column-${column.id}`} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.column}
        >
          <div className={styles.column_title}>
            {column.title}
            <span>{column.tasks.length}</span>
          </div>

          <div className={styles.column_tasks}>
            <TaskList column={column}/>
          </div>
        </div>
      )}
    </Draggable>
  );
}