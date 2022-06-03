import { useQuery } from 'react-query'

import { IFetchProductstQuery } from 'utils/interfaces/fetch'
import { getCurrentSpecialCampaignByDateAndLocale } from 'utils/specialCampaign'

import { getSpecialCampaignProducts } from 'services/market'

export function useFetchSpecialCampaignQuery(locale: string, language: string) {
  return useQuery<IFetchProductstQuery>('specialCampaign', async () => {
    const currentSpecialCampaign = getCurrentSpecialCampaignByDateAndLocale(language)

    if (currentSpecialCampaign) {
      const params = {
        locale,
        search: '',
        name: 'specialCampaign',
        campaignName: currentSpecialCampaign.name
      }

      return await getSpecialCampaignProducts(params)
    }

    return {} as IFetchProductstQuery
  })
}
