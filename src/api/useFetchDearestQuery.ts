import { useQuery } from 'react-query'

import { IFetchProductstQuery } from 'utils/interfaces/fetch'

import { getMarketDearestProducts } from 'services/market'

export function useFetchDearestQuery(locale: string) {
  return useQuery<IFetchProductstQuery>('dearest', async () => {
    const params = {
      name: 'dearest',
      locale,
      search: ''
    }

    return await getMarketDearestProducts(params)
  })
}
