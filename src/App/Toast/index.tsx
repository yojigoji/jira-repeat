import { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { uniqueId } from 'lodash'
import pubsub from 'sweet-pubsub'
import type { Toast } from './type'

import { Container, StyledToast, CloseIcon, Title, Message } from './Styles'

const Toast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const addToast = ({
      title,
      message,
      type = 'success',
      duration = 5
    }: Omit<Toast, 'id'> & { duration: number }) => {
      const id = uniqueId('toast-')

      setToasts((currentToasts) => [
        ...currentToasts,
        { id, type, title, message }
      ])

      if (duration) {
        setTimeout(() => removeToast(id), duration * 1000)
      }
    }

    pubsub.on('toast', addToast)

    return () => {
      pubsub.off('toast', addToast)
    }
  })

  const removeToast = (id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    )
  }

  return (
    <Container>
      <TransitionGroup>
        {toasts.map((toast) => (
          <CSSTransition key={toast.id} classNames="jira-toast" timeout={200}>
            <StyledToast key={toast.id} type={toast.type}>
              <CloseIcon type="close" />
              {toast.title && <Title>{toast.title}</Title>}
              {toast.message && <Message>{toast.message}</Message>}
            </StyledToast>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Container>
  )
}

export default Toast
