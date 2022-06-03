import Request from '@hotmart/request'
import { MessageActions, SsoExpiredToken } from './constants'
import platformMessage from './platformMessage'

export const showErrorMessage = message => {
  platformMessage(MessageActions.PLATFORM_ALERT, {
    type: 'error-label',
    content: message
  })
}

export const showSuccessMessage = message => {
  platformMessage(MessageActions.PLATFORM_ALERT, {
    type: 'success',
    content: message
  })
}

const setDefaultHeaders = token => {
  Request.setDefaultHeaders({ Authorization: `Bearer ${token}` })
}

const setDefaultErrorMessage = () => {
  Request.onError(
    responseError => {
      if (responseError.response.status === 401) {
        postMessage({ type: SsoExpiredToken }, process.env.APP_PLATFORM || '')
      }
      const {
        config: { url = '' } = {},
        data: { error = 'internal_server_error' } = {}
      } = responseError.response

      if (!url.includes('/ucode')) {
        showErrorMessage(`errors.${error}`)
      }
    }
  )
}

export const initRequestConfiguration = token => {
  if (!token) {
    throw new Error('Missing token param')
  }

  setDefaultHeaders(token)
  setDefaultErrorMessage()
}

export default Request
