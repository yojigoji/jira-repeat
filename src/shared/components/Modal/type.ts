interface ModalProps {
  className?: string
  testid?: string
  variant?: 'center' | 'aside'
  width?: number
  withCloseIcon?: boolean
  isOpen?: boolean
  onClose: () => void
  renderLink?: any
  renderContent: (prop: any) => React.ReactNode
}

export type { ModalProps }
