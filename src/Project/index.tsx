import { ProjectPage } from './Styles'

import NavbarLeft from './NavbarLeft'
import Sidebar from './Sidebar'

import project from '../App/assets/mock-data/project.json'

import { createQueryParamModalHelpers } from '../shared/utils/queryParamModal'
import { Modal } from '../shared/components'
import IssueSearch from './IssueSearch'
import IssueCreate from './IssueCreate'
import {
  Router,
  useLocation,
  useResolvedPath,
  useRoutes
} from 'react-router-dom'
import ProjectSettings from './ProjectSetting'
import Board from './Board'
import dnd from './Dnd'
import Dnd from './Dnd'

const Project = () => {
  const location = useLocation()

  const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search')
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create')

  return (
    <ProjectPage>
      <NavbarLeft
        issueSearchModalOpen={issueSearchModalHelpers.open}
        issueCreateModalOpen={issueCreateModalHelpers.open}
      />
      <Sidebar project={project.project} />
      {issueSearchModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:issue-search"
          variant="aside"
          width={600}
          onClose={issueSearchModalHelpers.close}
          renderContent={() => <IssueSearch project={project.project} />}
        />
      )}
      {issueCreateModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:issue-create"
          width={800}
          withCloseIcon={false}
          onClose={issueCreateModalHelpers.close}
          renderContent={(modal) => (
            <IssueCreate
              project={project.project}
              fetchProject={() => {
                console.log('fetch project')
              }}
              onCreate={() => {
                console.log('on create')
              }}
              modalClose={modal.close}
            />
          )}
        />
      )}

      <ProjectRoutes />
    </ProjectPage>
  )
}

const ProjectRoutes = () => {
  let routes = useRoutes([
    {
      path: 'board',
      element: (
        // <Board
        //   project={project.project}
        //   fetchProject={() => {
        //     console.log('fetch projects')
        //   }}
        //   updateLocalProjectIssues={() => {
        //     console.log('updateLocalProjectIssues')
        //   }}
        // ></Board>
        <Dnd></Dnd>
      )
    },
    {
      path: 'settings',
      element: (
        <ProjectSettings
          project={project.project}
          fetchProject={() => {
            console.log('it is fetch Project')
          }}
        ></ProjectSettings>
      )
    }
  ])

  return routes
}

export default Project
