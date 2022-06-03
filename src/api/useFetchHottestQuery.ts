import { useQuery } from 'react-query'

import { IFetchProductstQuery } from 'utils/interfaces/fetch'

import { getMarketHottestProducts } from 'services/market'

export function useFetchHottestQuery(locale: string) {
  return useQuery<IFetchProductstQuery>('hottest', async () => {
    const params = {
      name: 'hottest',
      locale,
      search: ''
    }

    return await getMarketHottestProducts(params)
  })
}
