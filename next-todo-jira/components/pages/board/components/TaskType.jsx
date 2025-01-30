import styles from "@/components/pages/board/board.module.css";

export default function TaskType({task}) {
  return (
    <div className={styles.task_type}>
      <span style={{backgroundColor: task.type?.color}}/>
      
      {task.type?.title}
    </div>
  );
}