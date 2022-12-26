import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

interface TaskProps {
  task: any
  index: number
}

const Container = styled.div<{ isDragging?: boolean }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
`

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`

const Task = ({ task, index }: TaskProps) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        <Handle {...provided.dragHandleProps} />
        {task.content}
      </Container>
    )}
  </Draggable>
)

export default Task
