import { useQuery } from 'react-query'

import { getProductRating } from 'services/market'

export interface IProductRating {
  productUcode: string
}

interface IRatings {
  index: number,
  total: number,
  percentage: number
}

export interface IProductRatingQuery {
  average: number,
  total: number,
  ratings: IRatings[]
}

export function useFetchProductRatingQuery({
  productUcode
}: IProductRating) {
  return useQuery<IProductRatingQuery>(['productRating', productUcode], async () => {
    const result = await getProductRating({ productUcode })

    const initialData = [...Array(5).keys()]
    const ratings: IRatings[] = []

    initialData.forEach((_, index) => {
      const rating = result.ratings[index + 1]

      ratings.push({
        index: index + 1,
        total: rating ?? 0,
        percentage: ((rating ?? 0) / result.total * 100)
      })
    })

    return {
      ...result,
      ratings: ratings.reverse()
    }
  })
}

