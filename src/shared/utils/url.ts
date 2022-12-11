import queryString from 'query-string'
import { omit } from 'lodash'

export const queryStringToObject = (str: string, options = {}) =>
  queryString.parse(str, {
    arrayFormat: 'bracket',
    ...options
  })

export const objectToQueryString = (obj = {}, options = {}): any =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options
  })

export const omitFromQueryString = (str: string, keys: string[]) =>
  objectToQueryString(omit(queryStringToObject(str), keys))

export const addToQueryString = (str: string, fields = {}) =>
  objectToQueryString({
    ...queryStringToObject(str),
    ...fields
  })
