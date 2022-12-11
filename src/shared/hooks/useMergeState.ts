import { isFunction } from 'lodash'
import { useCallback, useState } from 'react'

const useMergeState = (initialState: any) => {
  const [state, setState] = useState(initialState)

  const mergeState = useCallback((newState: any) => {
    if (isFunction(newState)) {
      setState((currentState: any) => ({
        ...currentState,
        ...newState(currentState)
      }))
    } else {
      setState((currentState: any) => ({ ...currentState, ...newState }))
    }
  }, [])

  return [state, mergeState]
}

export default useMergeState
