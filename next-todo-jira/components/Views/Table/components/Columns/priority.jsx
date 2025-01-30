import {get} from "@/lib/utils/data";

const Priority = ({row, col}) => {
  const color = get(row, 'priority.color')
  const title = get(row, col.id)

  if (!title) return '???'

  const validColor = color && /^#([0-9A-F]{3}){1,2}$/i.test(color) ? color : 'black';

  return (
    <div className={'border rounded-full py-1 px-2 flex items-center w-fit'}>
      <span className="inline-block w-3 h-3 rounded-full mr-2" style={{backgroundColor: validColor}}/>
      {title}
    </div>
  )
}

export default Priority