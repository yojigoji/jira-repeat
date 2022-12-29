import { Breadcrumbs } from '@/shared/components'
import { Fragment } from 'react'
import Header from './Header'
import Filters from './Filters'
import useMergeState from '@/shared/hooks/useMergeState'
import Lists from './Lists'

interface ProjectBoardProps {
  project: any
  fetchProject: any
  updateLocalProjectIssues: any
}

export interface Filters {
  searchTerm: string
  userIds: string[]
  myOnly: boolean
  recent: boolean
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
      <Lists
        project={project}
        filters={filters}
        updateLocalProjectIssues={() => {
          console.log('updateLocalProjectIssues')
        }}
      ></Lists>
    </Fragment>
  )
}

export default ProjectBoard
