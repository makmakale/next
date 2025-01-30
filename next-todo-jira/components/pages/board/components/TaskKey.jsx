export default function TaskKey({task}) {
  return (
    <div>{task.project?.alias || '<...>'} - {task.id}</div>
  );
}