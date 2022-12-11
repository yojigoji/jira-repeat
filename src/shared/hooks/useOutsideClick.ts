import { useEffect, useRef, MutableRefObject } from 'react'

import useDeepCompareMemoize from './useDeepCompareMemoize'

const useOutsideClick = (
  $ignoredElementRefs: Array<MutableRefObject<any>>,
  isListening: boolean,
  onOutsideClick: () => void,
  $listeningElementRef?: MutableRefObject<any>
) => {
  const $mouseDownTargetRef = useRef()
  const $ignoredElementRefsMemoized: any = useDeepCompareMemoize(
    [$ignoredElementRefs].flat()
  )

  useEffect(() => {
    const handleMouseDown = (event: any) => {
      $mouseDownTargetRef.current = event.target
    }

    const handleMouseUp = (event: any) => {
      const isAnyIgnoredElementAncestorOfTarget =
        $ignoredElementRefsMemoized.some(
          ($elementRef: any) =>
            $elementRef.current.contains($mouseDownTargetRef.current) ||
            $elementRef.current.contains(event.target)
        )
      if (event.button === 0 && !isAnyIgnoredElementAncestorOfTarget) {
        onOutsideClick()
      }
    }

    const $listeningElement = ($listeningElementRef || {}).current || document

    if (isListening) {
      $listeningElement.addEventListener('mousedown', handleMouseDown)
      $listeningElement.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      $listeningElement.removeEventListener('mousedown', handleMouseDown)
      $listeningElement.removeEventListener('mouseup', handleMouseUp)
    }
  }, [
    $ignoredElementRefsMemoized,
    $listeningElementRef,
    isListening,
    onOutsideClick
  ])
}

export default useOutsideClick
