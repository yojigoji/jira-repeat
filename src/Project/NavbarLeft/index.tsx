/* eslint-disable */
import type { ProjectNavbarLeftProps } from './types'
import { NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from './Styles'
import { Icon } from '../../shared/components'
import AboutTooltip from '../../shared/components/AboutTooltip'

const ProjectNavbarLeft = ({
  issueSearchModalOpen,
  issueCreateModalOpen
}: ProjectNavbarLeftProps) => (
  <NavLeft>
    <LogoLink to="/">
      <StyledLogo></StyledLogo>
    </LogoLink>

    <Item onClick={issueSearchModalOpen}>
      <Icon type="search" size={22} top={1} left={3}></Icon>
      <ItemText>Search issues</ItemText>
    </Item>

    <Item onClick={issueCreateModalOpen}>
      <Icon type="plus" size={27} />
      <ItemText>Create Issue</ItemText>
    </Item>

    <Bottom>
      <AboutTooltip
        placement="right"
        offset={{ top: -218 }}
        renderLink={(linkProps: any) => (
          <Item {...linkProps}>
            <Icon type="help" size={25} />
            <ItemText>About</ItemText>
          </Item>
        )}
      />
    </Bottom>
    {/* eslint-disable */}
  </NavLeft>
)

export default ProjectNavbarLeft
