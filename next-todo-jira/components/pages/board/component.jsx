import {Droppable} from "@hello-pangea/dnd";
import styles from "@/components/pages/board/board.module.css";
import Column from "@/components/pages/board/components/Column";

export default function BoardComponent({columns = []}) {
  return (
    <Droppable droppableId="board" type="status" direction="horizontal">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={styles.container}
        >
          {columns && columns.map((column, index) => (
            <Column key={column.id} column={column} index={index}/>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}