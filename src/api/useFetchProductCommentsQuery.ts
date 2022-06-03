import { useQuery } from 'react-query'

import { getProductComments } from 'services/market'

export interface ICommentsParams {
  productUcode: string,
  rows: number,
  page?: number,
  evaluation?: 'ALL' | 'NEGATIVE' | 'POSITIVE'
}

export interface IFetchCommentsQuery {
  total: number,
  answers: Array<{
    rate: number,
    text: string,
    userName: string,
    date: string
  }>
}

export function useFetchProductCommentsQuery({
  productUcode,
  rows,
  page = 1,
  evaluation = 'ALL'
}: ICommentsParams) {
  return useQuery<IFetchCommentsQuery>(['productComments', productUcode, evaluation, rows, page], async () => {
    const params = {
      productUcode,
      rows,
      page,
      evaluation
    }

    return await getProductComments(params)
  })
}
