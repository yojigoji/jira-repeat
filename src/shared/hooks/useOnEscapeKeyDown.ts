import { useEffect } from 'react'
import { KeyCodes } from '../enums/keyCodes'

const useOnEscapeKeyDown = (
  isListening: boolean,
  onEscapeKeyDown: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === KeyCodes.ESCAPE) {
        onEscapeKeyDown()
      }
    }

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isListening, onEscapeKeyDown])
}

export default useOnEscapeKeyDown
