import { useQuery } from 'react-query'

import { IFetchProductstQuery } from 'utils/interfaces/fetch'

import { getOtherProductsFromProducer } from 'services/market'

export function useFetchOtherProductsFromProducerQuery(
  productUcode: string | undefined,
  producerUcode: string | undefined,
  pages: number,
  rows: number
) {
  return useQuery<IFetchProductstQuery>(['productsFromProducer', producerUcode], async () => {
    const params = {
      productUcode,
      producerUcode,
      pages,
      rows
    }

    return await getOtherProductsFromProducer(params)
  })
}
