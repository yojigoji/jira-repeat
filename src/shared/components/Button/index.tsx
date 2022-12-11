/* eslint-disable react/display-name */
import { forwardRef, ReactNode } from 'react'
import { color } from '../../utils/styles'
import Icon, { FontIconCodes } from '../Icon'
import { buttonVariants, StyledButton, StyledSpinner, Text } from './Styles'

interface ButtonProps {
  style?: any
  className?: string
  children?: ReactNode
  variant?: keyof typeof buttonVariants
  icon?: keyof typeof FontIconCodes | ReactNode
  iconSize?: number
  disabled?: boolean
  isWorking?: boolean
  onClick?: () => void
}

const Button = forwardRef(
  (
    {
      children,
      variant = 'secondary',
      icon,
      iconSize = 18,
      disabled,
      isWorking,
      onClick,
      ...buttonProps
    }: ButtonProps,
    ref: any
  ) => {
    const handleClick = () => {
      if (disabled && !isWorking) {
        onClick && onClick()
      }
    }

    return (
      <StyledButton
        {...buttonProps}
        onClick={handleClick}
        disabled={disabled || isWorking}
        iconOnly={!children}
        ref={ref}
        variant={variant}
      >
        {isWorking && <StyledSpinner size={26} color={getIconColor(variant)} />}

        {!isWorking && icon && typeof icon === 'string' ? (
          <Icon type={icon as keyof typeof FontIconCodes} size={iconSize} />
        ) : (
          icon
        )}
        {children && <Text withPadding={isWorking || icon}>{children}</Text>}
      </StyledButton>
    )
  }
)

const getIconColor = (variant: keyof typeof buttonVariants) =>
  ['secondary', 'empty'].includes(variant) ? color.textDark : '#fff'

export default Button
