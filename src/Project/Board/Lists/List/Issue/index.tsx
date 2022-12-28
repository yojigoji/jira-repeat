import { Draggable } from 'react-beautiful-dnd'
import type { IssueType } from './types'
import {
  AssigneeAvatar,
  Assignees,
  Bottom,
  Issue,
  IssueLink,
  Title
} from './Styles'
import { useResolvedPath } from 'react-router-dom'
import { IssuePriorityIcon, IssueTypeIcon } from '@/shared/components'

interface ProjectBoardListIssueProps {
  projectUsers: any[]
  issue: IssueType
  index: number
}

const ProjectBoardListIssue = ({
  projectUsers,
  issue,
  index
}: ProjectBoardListIssueProps) => {
  const { pathname } = useResolvedPath('')

  const assignees = issue.userIds.map((userId) =>
    projectUsers.find((user) => user.id === userId)
  )

  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <IssueLink
          to={`${pathname}/issues/${issue.id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Issue
            isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
          >
            <Title>{issue.title}</Title>
            <Bottom>
              <div>
                <IssueTypeIcon type={issue.type} />
                <IssuePriorityIcon
                  priority={issue.priority}
                  top={-1}
                  left={4}
                />
              </div>
              <Assignees>
                {assignees.map((user) => (
                  <AssigneeAvatar
                    key={user.id}
                    size={24}
                    avatarUrl={user.avatarUrl}
                    name={user.name}
                  />
                ))}
              </Assignees>
            </Bottom>
          </Issue>
        </IssueLink>
      )}
    </Draggable>
  )
}

export default ProjectBoardListIssue
