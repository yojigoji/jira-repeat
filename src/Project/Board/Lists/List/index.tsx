import type { Filters } from '@/Project/Board/index'
import type { IssueType } from '@/Project/Board/Lists/List/Issue/types'
import { intersection } from 'lodash'
import moment from 'moment'
import { Issues, IssuesCount, List, Title } from './Styles'
import { Droppable } from 'react-beautiful-dnd'
import { IssueStatusCopy } from '@/shared/constants/issues'
import Issue from './Issue'

interface ProjectBoardListProps {
  status: string
  project: any
  filters: Filters
  currentUserId: number
}

const ProjectBoardList = ({
  status,
  project,
  filters,
  currentUserId
}: ProjectBoardListProps) => {
  const filteredIssues = filterIssues(project.issues, filters, currentUserId)
  const filteredListIssues = getSortedListIssues(filteredIssues, status)
  const allListIssues = getSortedListIssues(project.issues, status)

  return (
    <Droppable key={status} droppableId={status}>
      {(provided) => (
        <List>
          <Title>
            {`${IssueStatusCopy[status]}`}
            <IssuesCount>
              {formatIssuesCount(allListIssues, filteredListIssues)}
            </IssuesCount>
          </Title>
          <Issues {...provided.droppableProps} ref={provided.innerRef}>
            {filteredListIssues.map((issue, index) => (
              <Issue
                key={issue.id}
                projectUsers={project.users}
                issue={issue}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Issues>
        </List>
      )}
    </Droppable>
  )
}

const filterIssues = (
  projectIssues: IssueType[],
  filters: Filters,
  currentUserId: number
) => {
  const { searchTerm, userIds, myOnly, recent } = filters
  let issues = projectIssues

  if (searchTerm) {
    issues = issues.filter((issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  if (userIds.length > 0) {
    issues = issues.filter(
      (issue) => intersection(issue.userIds, userIds).length > 0
    )
  }
  if (myOnly && currentUserId) {
    issues = issues.filter((issue) =>
      issue.userIds.includes(currentUserId.toString())
    )
  }
  if (recent) {
    issues = issues.filter((issue) =>
      moment(issue.updatedAt).isAfter(moment().subtract(3, 'days'))
    )
  }

  return issues
}

const getSortedListIssues = (issues: IssueType[], status: string) =>
  issues
    .filter((issue) => issue.status === status)
    .sort((a, b) => a.listPosition - b.listPosition)

const formatIssuesCount = (
  allListIssues: IssueType[],
  filteredListIssues: IssueType[]
) => {
  if (allListIssues.length !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${allListIssues.length}`
  }
  return allListIssues.length
}

export default ProjectBoardList
