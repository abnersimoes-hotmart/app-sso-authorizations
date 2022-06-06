import ssoApi from '../api/sso'
import { execute } from '../api'
import { Consents } from 'state/consents'

export const getSsoConsents = (userCode: string) =>
  execute(async () => {
    const { data } = await ssoApi.get(`/rest/v1/consents/${userCode}`)

    return data as Consents[]
  })

export const deleteSsoConsent = (userCode: string, consentId: string) =>
  execute(async () => {
    const { data } = await ssoApi.delete(`/rest/v1/consent/${userCode}/${consentId}`)

    return data
  })
