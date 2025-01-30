import {get} from "@/lib/utils/data";

export default function StatusColumn({row, col}) {
  const title = get(row, 'title')
  const bgColor = get(row, 'bgColor')
  const textColor = get(row, 'textColor')

  return (
    <div className={'rounded-sm py-1 px-2 flex items-center w-fit uppercase text-xs font-bold text-nowrap'} style={{
      backgroundColor: bgColor,
      color: textColor,
    }}>
      {title}
    </div>
  );
}