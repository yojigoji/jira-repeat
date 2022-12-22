import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

interface TaskProps {
  task: any
  index: number
}

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`

const Task = ({ task, index }: TaskProps) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        {task.content}
      </Container>
    )}
  </Draggable>
)

export default Task
