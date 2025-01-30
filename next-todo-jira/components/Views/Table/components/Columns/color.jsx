import {get} from "@/lib/utils/data";

export const ColorColumn = ({row, col}) => {
  return (
    <div
      className="w-[20px] h-[20px] border rounded-md mx-auto"
      style={{
        backgroundColor: get(row, col.id)
      }}
    />
  )
}