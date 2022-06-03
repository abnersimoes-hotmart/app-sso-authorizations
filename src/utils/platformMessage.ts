import packageJSON from 'root/package.json'
import { MessageActions } from './constants'

const platformRedirect = (routeName, routeParams = {}, routeQueryParams = {}) => {
  platformMessage(MessageActions.PLATFORM_REDIRECT, {
    route: {
      name: routeName,
      params: routeParams,
      queryParams: routeQueryParams
    }
  })
}

const platformMessage = (type = '', data = {}) => {
  const message = {
    appName: packageJSON.name,
    type: `THIRD-PARTY-APP.${type}`,
    body: data
  }

  window.postMessage(message, window.location.origin)
}

export { platformRedirect }

export default platformMessage
