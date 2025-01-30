'use client'
import {useEffect, useState, useTransition} from "react";
import {DragDropContext} from '@hello-pangea/dnd'
import {getBoard, reorderColumns, reorderTasks} from "@/lib/actions/board";
import BoardComponent from "@/components/pages/board/component";
import FormMessage from "@/components/ui/form-message";
import {LoaderIcon} from "lucide-react";

const Board = () => {
  const [columns, setColumns] = useState([])
  const [error, setError] = useState('')
  const [isLoading, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const {data, error} = await getBoard()
      if (data) setColumns(data)
      if (error) setError(error)
    })
  }, [])

  const handleDragEnd = async (result) => {
    const {destination, source, type, draggableId} = result

    if (!destination) return

    // Handle column drag
    if (type === 'status') {
      const entries = [...columns]
      const sourceColumn = columns[source.index]

      if (!sourceColumn) return

      // change column order on UI
      const [removed] = entries.splice(source.index, 1)
      entries.splice(destination.index, 0, removed)
      setColumns(entries)

      // change column order on server
      await reorderColumns({
        id: sourceColumn.id,
        newOrder: destination.index,
        oldOrder: source.index
      })
    }

    if (type === 'task') {
      const startCol = columns.find(col => col.id === +source.droppableId)
      const finishCol = columns.find(col => col.id === +destination.droppableId)

      if (!startCol || !finishCol) return

      const newTasks = [...startCol.tasks]
      const finishTasks = [...finishCol.tasks]
      const [movedTask] = newTasks.splice(source.index, 1)

      if (startCol.id === finishCol.id) {
        newTasks.splice(destination.index, 0, movedTask)

        // change task order on UI
        setColumns(prevColumns => prevColumns.map(col => {
          if (col.id !== startCol.id) {
            return col
          }

          return {
            ...col,
            tasks: newTasks
          }
        }))

        // change task order on server
        await reorderTasks({
          id: +draggableId,
          statusId: +destination.droppableId,
          newOrder: destination.index,
          oldOrder: source.index
        })
      } else {
        finishTasks.splice(destination.index, 0, movedTask)

        // change task parent and order on UI
        setColumns(prevColumns => prevColumns.map(col => {
          if (col.id === startCol.id) {
            return {
              ...col,
              tasks: newTasks
            }
          }

          if (col.id === finishCol.id) {
            return {
              ...col,
              tasks: finishTasks
            }
          }

          return col
        }))

        // change task order on server
        await reorderTasks({
          id: +draggableId,
          statusId: +destination.droppableId,
          newOrder: destination.index,
          oldOrder: source.index
        })
      }
    }
  }

  return (
    <>
      {error && <FormMessage variant={'error'} message={error}/>}
      {isLoading && <LoaderIcon className="animate-spin"/>}
      {!isLoading && <DragDropContext onDragEnd={handleDragEnd}>
        <BoardComponent columns={columns}/>
      </DragDropContext>}
    </>
  )
};

export default Board;