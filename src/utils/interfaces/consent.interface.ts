export interface IConsentment {
  id: number
  serviceClientId: string
  serviceName: string
  serviceDescription: string
  serviceInformationUrl: string
  serviceLogo: string
  servicePrivacyUrl: string
  serviceSiteUrl: string
  scopes: string[]
  createdDate: string
  expirationDate: string
}

export type IConsents = Array<IConsentment>
