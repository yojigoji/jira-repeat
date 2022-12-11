import useQuery from './query'
import useMutation from './mutation'

/* eslint-disable react-hooks/rules-of-hooks */
export default {
  get: (...args: Parameters<typeof useQuery>) => useQuery(...args),
  post: (...args: [url: string]) => useMutation('post', ...args),
  put: (...args: [url: string]) => useMutation('put', ...args),
  patch: (...args: [url: string]) => useMutation('patch', ...args),
  delete: (...args: [url: string]) => useMutation('delete', ...args)
}
