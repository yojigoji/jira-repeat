import useCurrentUser from '@/shared/hooks/useCurrentUser'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Lists } from './Styles'
import { IssueStatus } from '@/shared/constants/issues'
import { stubArray } from 'lodash'
import List from './List'
import type { IssueType } from './List/Issue/types'
import {
  insertItemIntoArray,
  moveItemWithinArray
} from '@/shared/utils/javascript'

interface ProjectBoardListsProps {
  project: any
  filters: any
  updateLocalProjectIssues: () => void
}

const ProjectBoardLists = ({
  project,
  filters,
  updateLocalProjectIssues
}: ProjectBoardListsProps) => {
  const { currentUserId } = useCurrentUser()

  const handleIssueDrop = ({
    draggableId,
    destination,
    source
  }: DropResult) => {
    const issueId = Number(draggableId)
  }

  return (
    <DragDropContext onDragEnd={handleIssueDrop}>
      <Lists>
        {Object.values(IssueStatus).map((status) => (
          <List
            key={status}
            status={status}
            project={project}
            filters={filters}
            currentUserId={currentUserId}
          ></List>
        ))}
      </Lists>
    </DragDropContext>
  )
}

const isPositionChanged = (destination: any, source: any) => {
  if (!destination) return false
  const isSameList = destination.droppableId === source.droppabeId
  const isSamePosition = destination.index === source.index

  return !isSameList || !isSamePosition
}

const calculateIssueListPosition = (...args: any) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(
    ...(args as Parameters<typeof getAfterDropPrevNextIssue>)
  )
  let position

  if (!prevIssue && !nextIssue) {
    position = 1
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1
  } else {
    position =
      prevIssue.listPosition +
      (nextIssue.listPosition - prevIssue.listPosition) / 2
  }

  return position
}

const getAfterDropPrevNextIssue = (
  allIssues: IssueType[],
  destination: any,
  source: any,
  droppedIssueId: number
) => {
  const beforeDropDestinationIssues = getSortedListIssues(
    allIssues,
    destination.droppableId
  )

  const droppedIssue = allIssues.find(
    (issue: IssueType) => issue.id === droppedIssueId
  )
  const isSameList = destination.droppableId === source.droppableId

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      )
    : insertItemIntoArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      )

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1]
  }
}

const getSortedListIssues = (issues: IssueType[], status: string) =>
  issues
    .filter((issue) => issue.status === status)
    .sort((a, b) => a.listPosition - b.listPosition)

export default ProjectBoardLists
