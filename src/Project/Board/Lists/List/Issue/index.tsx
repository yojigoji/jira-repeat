import { Draggable } from 'react-beautiful-dnd'

import { IssueTypeIcon, IssuePriorityIcon } from '@/shared/components'

import {
  IssueLink,
  Issue,
  Title,
  Bottom,
  Assignees,
  AssigneeAvatar
} from './Styles'

interface ProjectBoardListIssueProps {
  projectUsers: any[]
  issue: any
  index: number
}

const ProjectBoardListIssue = ({
  projectUsers,
  issue,
  index
}: ProjectBoardListIssueProps) => {
  const assignees = issue.userIds.map((userId: string) =>
    projectUsers.find((user) => user.id === userId)
  )

  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <IssueLink
          to={`${match.url}/issues/${issue.id}`}
          ref={provided.innerRef}
          data-testid="list-issue"
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
                {assignees.map((user: any) => (
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
