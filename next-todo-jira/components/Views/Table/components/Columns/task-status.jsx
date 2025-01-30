import {get} from "@/lib/utils/data";

export default function TaskStatusColumn({row, col}) {
  const title = get(row, col.id)
  const bgColor = get(row, 'status.bgColor')
  const textColor = get(row, 'status.textColor')

  return (
    <div className={'rounded-sm py-1 px-2 flex items-center w-fit uppercase text-xs font-bold text-nowrap'} style={{
      backgroundColor: bgColor,
      color: textColor,
    }}>
      {title}
    </div>
  );
}