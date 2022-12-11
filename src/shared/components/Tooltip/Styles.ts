import styled from 'styled-components'
import { mixin, zIndexValues } from '../../utils/styles'

export const StyledTooltip = styled.div<{ width: number }>`
  z-index: ${zIndexValues.modal + 1};
  position: fixed;
  width: ${(props) => props.width}px;
  border-radius: 3px;
  background: #fff;
  ${mixin.hardwareAccelerate}
  ${mixin.boxShadowDropdown}
`
