import styled from 'styled-components'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

interface ColumnProps {
  title: string
  tasks: any[]
  id: string
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`

const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
`

const Column = ({ title, tasks, id }: ColumnProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Droppable droppableId={id}>
        {(provided) => (
          <TaskList {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => {
              console.log('task', task)
              return <Task index={index} key={task.id} task={task}></Task>
            })}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}

export default Column
