import { useQuery } from 'react-query'
import { getMarketFavoriteProducts } from 'services/market'

import { IFetchProductstQuery } from 'utils/interfaces/fetch'

interface IFavoritesParams {
  page?: number,
  rows: number,
  onSuccess?: (data: IFetchProductstQuery) => void
}

export function useFetchFavoritesQuery({ page = 1, rows, onSuccess }: IFavoritesParams) {
  return useQuery<IFetchProductstQuery>(['favorites', `${page}`], async () => {
    return await getMarketFavoriteProducts({ page, rows })
  }, { onSuccess })
}
