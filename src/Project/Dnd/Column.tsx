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
  width: 220px;

  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div<{ isDraggingOver?: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`

const Column = ({ title, tasks, id }: ColumnProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => {
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
