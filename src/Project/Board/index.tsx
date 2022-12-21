import { Breadcrumbs } from '@/shared/components'
import { Fragment } from 'react'
import Header from './Header'
import Filters from './Filters'
import useMergeState from '@/shared/hooks/useMergeState'

interface ProjectBoardProps {
  project: any
  fetchProject: any
  updateLocalProjectIssues: any
}

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false
}

const ProjectBoard = ({
  project,
  fetchProject,
  updateLocalProjectIssues
}: ProjectBoardProps) => {
  const [filters, mergeFilters] = useMergeState(defaultFilters)

  return (
    <Fragment>
      <Breadcrumbs items={['Projects', project.name, 'Kanban Board']} />
      <Header />
      <Filters
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
    </Fragment>
  )
}

export default ProjectBoard
