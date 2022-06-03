import { useQuery } from 'react-query'

import { IFetchProductstQuery } from 'utils/interfaces/fetch'

import { getMarketRecommendedProducts } from 'services/market'

export function useFetchRecommendedQuery(locale: string) {
  return useQuery<IFetchProductstQuery>('recommended', async () => {
    const params = {
      name: 'recommended',
      locale,
      search: '',
      page: 1,
      rows: 11
    }

    return await getMarketRecommendedProducts(params)
  })
}
