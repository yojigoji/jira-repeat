import { FontIconCodes } from '../Icon'

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string
  value?: string | number
  icon?: keyof typeof FontIconCodes
  invalid?: boolean
  filter?: RegExp
  onChange?: (a: any, event: any) => void
}

export type { InputProps }
