import { QueryClient } from 'react-query'

import { IFetchProductstQuery } from 'utils/interfaces/fetch'
import { IProductInformation } from 'utils/interfaces/productInformation'

export const addQueryData = (
  client: QueryClient,
  type: string | string[],
  data: IFetchProductstQuery | undefined,
  productInfo: IProductInformation
) => {
  if (data && data.content && data.content.findIndex(i => i.product.id === productInfo.product.id) < 0) {
    client.setQueryData(type, {
      ...data,
      content: [
        { ...productInfo, product: { ...productInfo.product, bookmarked: true } },
        ...data.content
      ]
    })
  }
}

export const addOrUpdateQueryData = (
  client: QueryClient,
  type: string | string[],
  data: IFetchProductstQuery | undefined,
  bookmarked: boolean,
  productInfo: IProductInformation
) => {
  if (data && data.content) {
    if (data.content.findIndex(i => i.product.id === productInfo.product.id) < 0) {
      client.setQueryData<IFetchProductstQuery>(type, {
        ...data,
        content: [
          { ...productInfo, product: { ...productInfo.product, bookmarked: true } },
          ...data.content
        ]
      })
    } else {
      client.setQueryData<IFetchProductstQuery>(type, {
        ...data,
        content: [
          ...data.content.map(item => {
            if (item.product.id === productInfo.product.id) {
              return { ...item, product: { ...item.product, bookmarked } }
            }

            return item
          })
        ]
      })
    }
  }
}

export const updateQueryData = (
  client: QueryClient,
  type: string | string[],
  data: IFetchProductstQuery | undefined,
  bookmarked: boolean,
  productInfo: IProductInformation
) => {
  if (data && data.content && data.content.findIndex(i => i.product.id === productInfo.product.id) >= 0) {
    client.setQueryData<IFetchProductstQuery>(type, {
      ...data,
      content: [
        ...data.content.map(item => {
          if (item.product.id === productInfo.product.id) {
            return { ...item, product: { ...item.product, bookmarked } }
          }

          return item
        })
      ]
    })
  }
}

export const removeQueryData = (
  client: QueryClient,
  type: string | string[],
  data: IFetchProductstQuery | undefined,
  productInfo: IProductInformation
) => {
  if (data && data.content && data.content.findIndex(i => i.product.id === productInfo.product.id) >= 0) {
    client.setQueryData<IFetchProductstQuery>(type, {
      ...data,
      content: [
        ...data.content.filter(item => item.product.id !== productInfo.product.id)
      ]
    })
  }
}


export const removeUnmarkedBookmark = (
  client: QueryClient
) => {
  const data = client.getQueryData<IFetchProductstQuery>(['favorites', '1'])

  if (data && data.content) {
    client.setQueryData<IFetchProductstQuery>(['favorites', '1'], {
      ...data,
      content: [
        ...data.content.filter(item => item.product.bookmarked)
      ]
    })
  }
}
