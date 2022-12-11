import React, { forwardRef } from 'react'
import TextareaAutoSize from 'react-textarea-autosize'

import { StyledTextarea } from './Styles'

interface TextareaProps {
  className?: string
  invalid?: boolean
  minRows?: number
  value?: string
  onChange: (...args: any) => void
}

const defaultProps = {
  className: undefined,
  invalid: false,
  minRows: 2,
  value: undefined,
  onChange: () => {}
}

const Textarea = forwardRef(
  (
    { className, invalid = false, onChange, ...textareaProps }: TextareaProps,
    ref: any
  ) => (
    <StyledTextarea className={className} invalid={invalid}>
      <TextareaAutoSize
        {...textareaProps}
        onChange={(event: any) => onChange(event.target.value, event)}
        ref={ref || undefined}
      />
    </StyledTextarea>
  )
)

Textarea.defaultProps = defaultProps

export default Textarea
