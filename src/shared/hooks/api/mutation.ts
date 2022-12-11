import { useCallback } from 'react'
import api from '../../utils/api'
import useMergeState from '../useMergeState'

const useMutation = (method: keyof typeof isWorkingAlias, url: string) => {
  const [state, mergeState] = useMergeState({
    data: null,
    error: null,
    isWorking: false
  })

  const makeRequest = useCallback(
    (variables = {}) =>
      new Promise((resolve, reject) => {
        mergeState({ isWorking: true })

        api[method](url, variables).then(
          (data: any) => {
            resolve(data)
            mergeState({ data, error: null, isWorking: false })
          },
          (error: Error) => {
            reject(error)
            mergeState({ error, data: null, isWorking: false })
          }
        )
      }),
    [method, url, mergeState]
  )

  return [
    {
      ...state,
      [isWorkingAlias[method]]: state.isWorking
    },
    makeRequest
  ]
}

export const isWorkingAlias = {
  post: 'isCreating',
  put: 'isUpdating',
  patch: 'isUpdating',
  delete: 'isDeleting'
}

export default useMutation
