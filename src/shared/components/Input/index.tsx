import { forwardRef } from 'react'
import { InputElement, StyledIcon, StyledInput } from './Styles'
import { InputProps } from './type'

const Input = forwardRef(
  (
    { icon, className, filter, onChange, ...inputProps }: InputProps,
    ref: any
  ) => {
    const handleChange = (event: any) => {
      if (!filter || filter.test(event.target.value)) {
        onChange && onChange(event.target.value, event)
      }
    }

    return (
      <StyledInput className={className}>
        {icon && <StyledIcon type={icon} size={15} />}
        <InputElement
          {...inputProps}
          onChange={handleChange}
          hasIcon={!!icon}
          ref={ref}
        />
      </StyledInput>
    )
  }
)

export default Input
