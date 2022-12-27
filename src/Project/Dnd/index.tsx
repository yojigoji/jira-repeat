import initialData, { Columns, Tasks } from './initial-data'
import Column from './Column'

import {
  DragDropContext,
  Droppable,
  DragStart,
  DragUpdate,
  DropResult
} from 'react-beautiful-dnd'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

const Dnd = () => {
  const [data, setData] = useState(initialData)

  const onDragEnd = (result: DropResult) => {
    document.body.style.color = 'inherit'
    document.body.style.backgroundColor = 'inherit'
    const { destination, source, draggableId, type } = result
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

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId as any)

      const newState = {
        ...data,
        columnOrder: newColumnOrder
      }

      setData(newState)
      return
    }

    const start = data.columns[source.droppableId as Columns]
    const finish = data.columns[destination.droppableId as Columns]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId as Tasks)

      const newColumn = {
        ...start,
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
      return
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishedTaskIds = Array.from(finish.taskIds)
    finishedTaskIds.splice(destination.index, 0, draggableId as Tasks)
    const newFinish = {
      ...finish,
      taskIds: finishedTaskIds
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    setData(newState)
  }

  const onDragStart = (start: DragStart) => {
    const homeIndex = data.columnOrder.indexOf(start.source.droppableId as any)
  }

  const onDragUpdate = (update: DragUpdate) => {
    const { destination } = update
    const opacity = destination
      ? destination.index / Object.keys(data.tasks).length
      : 0
    document.body.style.backgroundColor = `rgba(153,141, 217, ${opacity})`
  }

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-column" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId as Columns]
              const tasks = column.taskIds.map(
                (taskId: Tasks) => data.tasks[taskId]
              )

              return (
                <Column
                  title={column.title}
                  key={column.id}
                  id={column.id}
                  tasks={tasks}
                  index={index}
                />
              )
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Dnd
