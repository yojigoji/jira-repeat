import {
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
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
  const { pathname } = useResolvedPath('')

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

      {renderLinkItem(pathname, 'Kanban Board', 'board', '/board')}
      {renderLinkItem(pathname, 'Project settings', 'settings', '/settings')}
      <Divider />
      {renderLinkItem(pathname, 'Releases', 'shipping')}
      {renderLinkItem(pathname, 'Issues and filters', 'issues')}
      {renderLinkItem(pathname, 'Pages', 'page')}
      {renderLinkItem(pathname, 'Reports', 'reports')}
      {renderLinkItem(pathname, 'Components', 'component')}
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
    <LinkItem {...(linkItemProps as any)}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  )
}

export default ProjectSidebar
