import initialData from './initial-data'
import Column from './Column'

import { DragDropContext } from 'react-beautiful-dnd'

const Dnd = () => {
  return (
    <DragDropContext
      onDragEnd={() => {
        console.log('123')
      }}
    >
      {initialData.columnOrder.map((columnId) => {
        const column = initialData.columns[columnId]
        const tasks = column.taskIds.map((taskId) => initialData.tasks[taskId])

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
