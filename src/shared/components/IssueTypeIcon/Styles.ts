import styled from 'styled-components'

import { issueTypeColors } from '../../utils/styles'
import { Icon } from '../'

export const TypeIcon = styled(Icon)<{ color: keyof typeof issueTypeColors }>`
  color: ${(props) => issueTypeColors[props.color]};
`
