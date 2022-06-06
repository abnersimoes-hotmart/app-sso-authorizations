import { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { SsoExpiredToken } from '../utils/constants'

export const onResponse = (response: AxiosResponse) => response

export const onResponseError = (error: AxiosError): AxiosError => {
  if (error.response?.status === 401) {
    postMessage({ type: SsoExpiredToken }, process.env.APP_PLATFORM || '')
  }
  return error
}

export const execute = (callback: () => unknown) => {
  try {
    return callback()
  } catch (err: any) {
    throw err.response.data.error
  }
}

export const setHeaderToken = (api: AxiosInstance, token: string) => {
  api.defaults.headers = {}
  api.defaults.headers = { Authorization: token }
}
