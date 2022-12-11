import history from '../../browserHistory'
import { useNavigate } from 'react-router-dom'

import {
  queryStringToObject,
  addToQueryString,
  omitFromQueryString
} from './url'

const open = (param: string) => {
  history.push({
    pathname: window.location.pathname,
    search: addToQueryString(history.location.search, {
      [`modal-${param}`]: true
    })
  })
  // history push方法未使react页面重新渲染
  window.location.reload()
}

const close = (param: string) => {
  history.push({
    pathname: window.location.pathname,
    search: omitFromQueryString(window.location.search, [`modal-${param}`])
  })
  window.location.reload()
}
const isOpen = (param: string) =>
  !!queryStringToObject(history.location.search)[`modal-${param}`]

export const createQueryParamModalHelpers = (param: string) => ({
  open: () => open(param),
  close: () => close(param),
  isOpen: () => isOpen(param)
})
