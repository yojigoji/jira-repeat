import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import useOnEscapeKeyDown from '../../hooks/useOnEscapeKeyDown'
import useOutsideClick from '../../hooks/useOutsideClick'
import {
  ClickableOverlay,
  CloseIcon,
  ScrollOverlay,
  StyledModal
} from './Styles'
import type { ModalProps } from './type'

const Modal = ({
  className,
  testid = 'modal',
  variant = 'center',
  width = 600,
  withCloseIcon = true,
  isOpen: propsIsOpen,
  onClose: tellParentToClose,
  renderLink,
  renderContent
}: ModalProps) => {
  const [stateIsOpen, setStateOpen] = useState(false)
  const isControlled = typeof propsIsOpen === 'boolean'
  const isOpen = isControlled ? propsIsOpen : stateIsOpen

  const $modalRef = useRef<any>()
  const $clickableOverlayRef = useRef<any>()

  const closeModal = useCallback(() => {
    if (!isControlled) {
      setStateOpen(false)
    } else {
      tellParentToClose()
    }
  }, [isControlled, tellParentToClose])

  useOutsideClick([$modalRef], isOpen, closeModal, $clickableOverlayRef)
  useOnEscapeKeyDown(isOpen, closeModal)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [isOpen])

  return (
    <Fragment>
      {!isControlled && renderLink({ open: () => setStateOpen(true) })}

      {isOpen &&
        ReactDOM.createPortal(
          <ScrollOverlay>
            <ClickableOverlay variant={variant} ref={$clickableOverlayRef}>
              <StyledModal
                className={className}
                variant={variant}
                width={width}
                data-testid={testid}
                ref={$modalRef}
              >
                {withCloseIcon && (
                  <CloseIcon
                    type="close"
                    variant={variant}
                    onClick={closeModal}
                  />
                )}

                {renderContent({ close: closeModal })}
              </StyledModal>
            </ClickableOverlay>
          </ScrollOverlay>,
          $root
        )}
    </Fragment>
  )
}

const $root = document.getElementById('root') as HTMLElement

export default Modal
