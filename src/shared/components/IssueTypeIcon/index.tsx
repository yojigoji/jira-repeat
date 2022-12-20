import { issueTypeColors } from '../../utils/styles'
import { TypeIcon } from './Styles'

interface IssueTypeIconProps {
  type: keyof typeof issueTypeColors
}

const IssueTypeIcon = ({ type, ...otherProps }: IssueTypeIconProps & any) => (
  <TypeIcon type={type} color={type} size={18} {...otherProps} />
)

export default IssueTypeIcon
