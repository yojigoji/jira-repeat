import { xor } from 'lodash'
import {
  AvatarIsActiveBorder,
  Avatars,
  ClearAll,
  Filters,
  SearchInput,
  StyledAvatar,
  StyledButton
} from './Styles'

interface ProjectBoardFiltersProps {
  projectUsers: any[]
  defaultFilters: any
  filters: any
  mergeFilters: (...arg: any) => void
}

const ProjectBoardFilters = ({
  projectUsers,
  defaultFilters,
  filters,
  mergeFilters
}: ProjectBoardFiltersProps) => {
  const { searchTerm, userIds, myOnly, recent } = filters

  const areFiltersCleared =
    !searchTerm && userIds.length === 0 && !myOnly && !recent

  return (
    <Filters data-testid="board-filters">
      <SearchInput
        icon="search"
        value={searchTerm}
        onChange={(value) => {
          console.log('value', value)
        }}
      />
      <Avatars>
        {projectUsers.map((user) => (
          <AvatarIsActiveBorder
            key={user.id}
            isActive={userIds.includes(user.id)}
          >
            <StyledAvatar
              avartarUrl={user.avatarUrl}
              name={user.name}
              onClick={() => mergeFilters({ userIds: xor(userIds, [user.id]) })}
            />
          </AvatarIsActiveBorder>
        ))}
      </Avatars>
      <StyledButton
        variant="empty"
        isActive={myOnly}
        onClick={() => mergeFilters({ myOnly: !myOnly })}
      >
        Only My Issues
      </StyledButton>
      <StyledButton
        variant="empty"
        isActive={recent}
        onClick={() => mergeFilters({ recent: !recent })}
      >
        Recently Updated
      </StyledButton>
      {!areFiltersCleared && (
        <ClearAll onClick={() => mergeFilters(defaultFilters)}>
          Clear all
        </ClearAll>
      )}
    </Filters>
  )
}

export default ProjectBoardFilters
