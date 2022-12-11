import styled from "styled-components"
import Button from "../../shared/components/Button"
import { font } from "../../shared/utils/styles"

export const FormCont = styled.div`
  display: flex;
  justify-content: center;
`

export const FormElement = styled(Form.Element)`
  width: 100%;
  max-width: 640px;
`

export const FormHeading = styled.h1`
  padding: 6px 0 15px;
  ${font.size(24)}
  ${font.medium}
`

export const ActionButton = styled(Button)`
  margin-top: 30px;
`
