import { ISpecialCampaign } from 'utils/interfaces/specialCampaign'

export const SpecialCampaignTypes = {
  Easter: 'easter'
}

const EasterCampaign = {
  type: SpecialCampaignTypes.Easter,
  name: 'pascoa2022',
  eventLabel: 'Campaign-Pascoa2022',
  toggleName: 'ENABLE_CAMPAIGN',
  labels: {
    title: 'special_campaign.campaign_easter.title',
    description: 'special_campaign.campaign_easter.description',
    orderByHottest: 'special_campaign.campaign_easter.order_by_hottest',
    orderByDearest: 'special_campaign.campaign_easter.order_by_dearest',
    logoAlt: 'special_campaign.campaign_easter.logo_alt'
  }
}

export const SpecialCampaigns: ISpecialCampaign[] = [
  {
    ...EasterCampaign,
    language: 'PT_BR',
    startDate: '2022-03-14',
    endDate: '2022-04-24T23:59'
  }
]

export function getCurrentSpecialCampaignsByDate(): ISpecialCampaign[] {
  const currentDate = Date.now()

  return SpecialCampaigns.filter(campaign => {
    const startDate = new Date(campaign.startDate).getTime()
    const endDate = new Date(campaign.endDate).getTime()

    return currentDate >= startDate && currentDate < endDate
  })
}

export function getCurrentSpecialCampaignByDateAndLocale(locale): ISpecialCampaign | null {
  const currentCampaigns = getCurrentSpecialCampaignsByDate()

  if (currentCampaigns.length > 0) {
    const currentCampaignByLocale = currentCampaigns.filter(campaign => campaign.language === locale)

    return currentCampaignByLocale[0] || null
  }

  return null
}

export function getLanguagesToShowSpecialCampaign(): string[] {
  const languages: string[] = []

  const currentCampaigns = getCurrentSpecialCampaignsByDate()

  currentCampaigns.map(campaign => languages.push(campaign.language))

  return languages
}
