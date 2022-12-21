import { useRouteMatch } from 'react-router-dom'
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
  projectUsers: PropTypes.array.isRequired
  issue: PropTypes.object.isRequired
  index: PropTypes.number.isRequired
}
