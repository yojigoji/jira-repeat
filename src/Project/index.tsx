import { ProjectPage } from './Styles'

import NavbarLeft from './NavbarLeft'
import Sidebar from './Sidebar'

import project from '../App/assets/mock-data/project.json'

import { createQueryParamModalHelpers } from '../shared/utils/queryParamModal'
import { Modal } from '../shared/components'
import IssueSearch from './IssueSearch'
import { divide } from 'lodash'

const Project = () => {
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
          renderContent={(modal) => <div>123</div>}
        />
      )}
    </ProjectPage>
  )
}

export default Project
