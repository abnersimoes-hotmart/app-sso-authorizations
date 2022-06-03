import { useQuery } from 'react-query'

import { IFetchProductstQuery } from 'utils/interfaces/fetch'

import { getMarketLatestProducts } from 'services/market'

export function useFetchNewestQuery(locale: string) {
  return useQuery<IFetchProductstQuery>('newest', async () => {
    const params = {
      name: 'newest',
      locale,
      search: ''
    }

    return await getMarketLatestProducts(params)
  })
}
