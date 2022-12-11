import axios from 'axios'

import history from '../../browserHistory'

import { getStoredAuthToken, removeStoredAuthToken } from './authToken'
import toast from './toast'
// import { objectToQueryString } from './url'

const defaults = {
  baseURL: 'http://localhost:3000', // process.env.API_URL ||
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: getStoredAuthToken()
      ? `Bearer ${getStoredAuthToken()}`
      : undefined
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message:
      'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {}
  }
}

const api = (method: string, url: string, variables: any) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined
      // depracted
      // paramsSerializer: objectToQueryString
    }).then(
      (response) => {
        resolve(response.data)
      },
      (error) => {
        if (error.response) {
          if (error.response.data.error.code === 'INVALID_TOKEN') {
            removeStoredAuthToken()
            history.push('/authenticate')
          } else {
            reject(error.response.data.error)
          }
        } else {
          reject(defaults.error)
        }
      }
    )
  })

const optimisticUpdate = async (
  url: string,
  { updatedFields, currentFields, setLocalData }: any
) => {
  try {
    setLocalData(updatedFields)
    await api('put', url, updatedFields)
  } catch (error: any) {
    setLocalData(currentFields)
    toast.error(error)
  }
}

export default {
  get: (...args: [url: string, variables: any]) => api('get', ...args),
  post: (...args: [url: string, variables: any]) => api('post', ...args),
  put: (...args: [url: string, variables: any]) => api('put', ...args),
  patch: (...args: [url: string, variables: any]) => api('patch', ...args),
  delete: (...args: [url: string, variables: any]) => api('delete', ...args),
  optimisticUpdate
}
