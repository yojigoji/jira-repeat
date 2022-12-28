import useCurrentUser from "@/shared/hooks/useCurrentUser"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Lists } from "./Styles"
import { IssueStatus } from "@/shared/constants/issues"

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
      <Lists>{Object.values(IssueStatus).map(status => (

      ))}</Lists>
    </DragDropContext>
  )
}
