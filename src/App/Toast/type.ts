import { color } from '../../shared/utils/styles'

interface Toast {
  readonly title: string
  readonly message: string
  readonly type: keyof typeof color
  readonly id: string
}

export type { Toast }
