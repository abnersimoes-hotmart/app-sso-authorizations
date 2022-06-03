import Request from '@hotmart/request'

export const sendABTestExecute = params => {
  return Request('abtest.execute', params)
}
