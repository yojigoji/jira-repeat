import {
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
  useRoutes
} from 'react-router-dom'
import { Icon } from '../../shared/components'
import ProjectAvatar from '../../shared/components/ProjectAvatar'
import { ProjectCategoryCopy } from '../../shared/enums/projects'
import {
  Sidebar,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  Divider,
  LinkItem,
  LinkText,
  NotImplemented
} from './Styles'

const ProjectSidebar = ({ project }: { project: any }) => {
  const location = useLocation()

  return (
    <Sidebar>
      <ProjectInfo>
        <ProjectAvatar />
        <ProjectTexts>
          <ProjectName>{project.name}</ProjectName>
          <ProjectCategory>
            {
              ProjectCategoryCopy[
                project.category.toUpperCase() as keyof typeof ProjectCategoryCopy
              ]
            }{' '}
            project
          </ProjectCategory>
        </ProjectTexts>
      </ProjectInfo>

      {renderLinkItem(location.pathname, 'Kanban Board', 'board', '/board')}
      {renderLinkItem(
        location.pathname,
        'Project settings',
        'settings',
        '/settings'
      )}
      <Divider />
      {renderLinkItem(location.pathname, 'Releases', 'shipping')}
      {renderLinkItem(location.pathname, 'Issues and filters', 'issues')}
      {renderLinkItem(location.pathname, 'Pages', 'page')}
      {renderLinkItem(location.pathname, 'Reports', 'reports')}
      {renderLinkItem(location.pathname, 'Components', 'component')}
    </Sidebar>
  )
}

const renderLinkItem = (
  routePath: any,
  text: string,
  iconType: any,
  path: string = ''
) => {
  const isImplemented = !!path

  const linkItemProps = isImplemented
    ? { as: NavLink, exact: 'true', to: `${routePath}${path}` }
    : { as: 'div' }

  return (
    <div {...linkItemProps}>
      <LinkItem to={`${path}` || 'false'}>
        <Icon type={iconType} />
        <LinkText>{text}</LinkText>
        {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
      </LinkItem>
    </div>
  )
}

export default ProjectSidebar
