import { FontIconCodes } from './index'

interface PropTypes extends React.HTMLAttributes<HTMLElement> {
  className?: string
  type: keyof typeof FontIconCodes
  size?: number
  left?: number
  top?: number
}

export type { PropTypes }
