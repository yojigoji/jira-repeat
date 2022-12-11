import { Fragment, useState, useRef, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import useOutsideClick from '../../hooks/useOutsideClick'

import { StyledTooltip } from './Styles'

interface TooltipProps {
  className: string
  placement: 'top' | 'right' | 'bottom' | 'left'
  offset: {
    top: number
    left: number
  }
  width: number
  renderLink: any
  renderContent: any
}

const Tooltip = ({
  className,
  placement,
  offset,
  width,
  renderLink,
  renderContent
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const $linkRef = useRef<any>()
  const $tooltipRef = useRef<any>()

  const openTooltip = () => setIsOpen(true)
  const closeTooltip = () => setIsOpen(false)

  useOutsideClick([$tooltipRef, $linkRef], isOpen, closeTooltip)

  useLayoutEffect(() => {
    const setTooltipPosition = () => {
      const { top, left } = calcPosition(
        offset,
        placement,
        $tooltipRef,
        $linkRef
      )
      $tooltipRef.current.style.top = `${top}px`
      $tooltipRef.current.style.left = `${left}px`
    }

    if (isOpen) {
      setTooltipPosition()
      window.addEventListener('resize', setTooltipPosition)
      window.addEventListener('scroll', setTooltipPosition)
    }

    return () => {
      window.removeEventListener('resize', setTooltipPosition)
      window.removeEventListener('scroll', setTooltipPosition)
    }
  }, [isOpen, offset, placement])

  return (
    <Fragment>
      {renderLink({
        ref: $linkRef,
        onClick: isOpen ? closeTooltip : openTooltip
      })}

      {isOpen &&
        ReactDOM.createPortal(
          <StyledTooltip className={className} ref={$tooltipRef} width={width}>
            {renderContent({ close: closeTooltip })}
          </StyledTooltip>,
          $root
        )}
    </Fragment>
  )
}

const calcPosition = (
  offset: {
    top: number
    left: number
  },
  placement: 'top' | 'right' | 'bottom' | 'left',
  $tooltipRef: any,
  $linkRef: any
) => {
  const margin = 10
  const finalOffset = { ...{ top: 0, left: 0 }, ...offset }

  const tooltipRect = $tooltipRef.current.getBoundingClientRect()
  const linkRect = $linkRef.current.getBoundingClientRect()

  const linkCenterY = linkRect.top + linkRect.height / 2
  const linkCenterX = linkRect.left + linkRect.width / 2

  const placements = {
    top: {
      top: linkRect.top - margin - tooltipRect.height,
      left: linkCenterX - tooltipRect.width / 2
    },
    right: {
      top: linkCenterY - tooltipRect.height / 2,
      left: linkRect.right + margin
    },
    bottom: {
      top: linkRect.bottom + margin,
      left: linkCenterX - tooltipRect.width / 2
    },
    left: {
      top: linkCenterY - tooltipRect.height / 2,
      left: linkRect.left - margin - tooltipRect.width
    }
  }
  return {
    top: placements[placement].top + finalOffset.top,
    left: placements[placement].left + finalOffset.left
  }
}

const $root = document.getElementById('root') as Element

export default Tooltip
