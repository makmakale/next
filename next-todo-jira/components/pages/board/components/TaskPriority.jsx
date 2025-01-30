import {AlarmClock} from "lucide-react";
import styles from "@/components/pages/board/board.module.css";

export default function TaskPriority({task}) {
  return (
    <div
      className={styles.task_priority}
      style={{
        color: task.priority?.color
      }}
    >
      <AlarmClock className="w-4 h-4 mr-2"/> {task.priority?.title}
    </div>
  );
}