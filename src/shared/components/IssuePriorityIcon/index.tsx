import { PriorityIcon } from './Styles'
import { IssuePriority } from '@/shared/constants/issues'

interface IssuePriorityIconProps {
  priority: string
}

const IssuePriorityIcon = ({
  priority,
  ...otherProps
}: IssuePriorityIconProps & any) => {
  const iconType = [IssuePriority.LOW, IssuePriority.LOWEST].includes(priority)
    ? 'arrow-down'
    : 'arrow-up'

  return (
    <PriorityIcon type={iconType} color={priority} size={18} {...otherProps} />
  )
}

export default IssuePriorityIcon
