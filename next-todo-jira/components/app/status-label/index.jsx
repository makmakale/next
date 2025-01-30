'use client'

export default function StatusLabel({status = {}}) {
  const {title, label, bgColor, textColor} = status

  const _label = title || label

  return (
    <div className={'rounded-sm py-1 px-2 flex items-center w-fit uppercase text-xs font-bold text-nowrap'}
         style={{
           backgroundColor: bgColor,
           color: textColor,
         }}>
      {_label}
    </div>
  );
}