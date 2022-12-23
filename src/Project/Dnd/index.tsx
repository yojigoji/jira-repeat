import initialData, { Columns, Tasks } from './initial-data'
import Column from './Column'

import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useState } from 'react'

const Dnd = () => {
  const [data, setData] = useState(initialData)

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    console.log('123', result)

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const column = data.columns[source.droppableId as Columns]
    const newTaskIds = Array.from(column.taskIds)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId as Tasks)

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn
      }
    }

    setData(newState)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId]
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId])

        return (
          <Column
            title={column.title}
            key={column.id}
            id={column.id}
            tasks={tasks}
          ></Column>
        )
      })}
    </DragDropContext>
  )
}

export default Dnd
