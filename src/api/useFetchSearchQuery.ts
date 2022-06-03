import { useQuery } from 'react-query'

import { IFetchProductstQuery } from 'utils/interfaces/fetch'
import { generateRequestParams } from 'utils/generateRequestParams'

import { getCurrentSpecialCampaignByDateAndLocale } from 'utils/specialCampaign'
import { getMarketDearestProducts, getMarketHottestProducts, getMarketLatestProducts, getMarketProducts, getMarketRecommendedProducts, getSpecialCampaignProducts } from 'services/market'

export function useFetchSearchQuery(filters, locale) {
  return useQuery<IFetchProductstQuery>('search', async () => {
    const params = generateRequestParams(filters, locale)
    const currentSpecialCampaign = getCurrentSpecialCampaignByDateAndLocale(locale)

    if (params.name === 'recommended') {
      return await getMarketRecommendedProducts(params)
    }
    if (params.name === 'hottest') {
      return await getMarketHottestProducts(params)
    }
    if (params.name === 'dearest') {
      return await getMarketDearestProducts(params)
    }
    if (params.name === 'newest') {
      return await getMarketLatestProducts(params)
    }

    if (currentSpecialCampaign) {
      if (params.name === 'specialCampaign') {
        const specialCampaignParams = {
          ...params,
          campaignName: currentSpecialCampaign.name
        }

        return await getSpecialCampaignProducts(specialCampaignParams)
      }
      if (params.name === 'specialCampaignHottest') {
        const specialCampaignHottestParams = {
          ...params,
          name: 'hottest',
          campaignName: currentSpecialCampaign.name
        }

        return await getSpecialCampaignProducts(specialCampaignHottestParams)
      }
      if (params.name === 'specialCampaignDearest') {
        const specialCampaignDearestParams = {
          ...params,
          name: 'dearest',
          campaignName: currentSpecialCampaign.name
        }

        return await getSpecialCampaignProducts(specialCampaignDearestParams)
      }
    }

    return await getMarketProducts(params)
  }, {
    cacheTime: 0
  })
}
