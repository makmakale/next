import {format} from "date-fns";
import {get} from "@/lib/utils/data";

const DateColumn = ({row, col}) => {
  const date = get(row, col.id)

  if (!date) return null

  return (
    <div>
      {format(new Date(date), "dd MMM, yyyy")}
    </div>
  )
}

export default DateColumn