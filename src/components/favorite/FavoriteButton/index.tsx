import React, { MouseEvent } from 'react'

import { useMutation, useQueryClient } from 'react-query'

import { IFetchProductstQuery } from 'utils/interfaces/fetch'
import { IProductInformation } from 'utils/interfaces/productInformation'

import { sendMarketAddFavoriteProduct, sendMarketRemoveFavoriteProduct } from 'services/market'

import { Button, Icon } from 'components/basic'

import { addOrUpdateQueryData, updateQueryData } from './helpers'

import './style.scss'

export interface IFavoriteButton {
  bookmarked: boolean,
  productInfo: IProductInformation,
  page?: number,
  onClick?: () => void
}

export interface IFavoriteCache {
  productID: number,
  niche: string
}

// eslint-disable-next-line init-declarations
let favoriteCacheTimeout: NodeJS.Timeout
let addFavoriteCacheIds: IFavoriteCache[] = []
let removeFavoriteCacheIds: IFavoriteCache[] = []

const FavoriteButton = ({ productInfo, bookmarked, page = 1, onClick = () => null }: IFavoriteButton) => {
  const client = useQueryClient()

  const addFavotireProductMutation = useMutation(async () => {
    return true
  },
  {
    onMutate: async (bookmarked: boolean) => {
      const prevSpecialCampaignProduct = client.getQueryData<IFetchProductstQuery>('specialCampaign')
      const prevRecommendedProduct = client.getQueryData<IFetchProductstQuery>('recommended')
      const prevHottestProduct = client.getQueryData<IFetchProductstQuery>('hottest')
      const prevNewestProduct = client.getQueryData<IFetchProductstQuery>('newest')
      const prevDearestProduct = client.getQueryData<IFetchProductstQuery>('dearest')
      const prevFavoriteProduct = client.getQueryData<IFetchProductstQuery>(['favorites', `${page}`])
      const prevSearchProduct = client.getQueryData<IFetchProductstQuery>('search')
      const prevProductsFromProducer = client.getQueryData<IFetchProductstQuery>(['productsFromProducer', productInfo.producer.ucode])

      updateQueryData(client, 'specialCampaign', prevSpecialCampaignProduct, bookmarked, productInfo)
      updateQueryData(client, 'recommended', prevRecommendedProduct, bookmarked, productInfo)
      updateQueryData(client, 'hottest', prevHottestProduct, bookmarked, productInfo)
      updateQueryData(client, 'newest', prevNewestProduct, bookmarked, productInfo)
      updateQueryData(client, 'dearest', prevDearestProduct, bookmarked, productInfo)
      updateQueryData(client, 'search', prevSearchProduct, bookmarked, productInfo)
      updateQueryData(client, ['productsFromProducer', productInfo.producer.ucode], prevProductsFromProducer, bookmarked, productInfo)

      // Add Favorite List Cache
      addOrUpdateQueryData(client, ['favorites', `${page}`], prevFavoriteProduct, bookmarked, productInfo)
    }
  }
  )

  const handleClickToggleFavorite = async (
    event: MouseEvent<HTMLButtonElement>,
    bookmarked: boolean
  ) => {
    event.preventDefault()
    event.stopPropagation()

    onClick()

    // TODO: Improve the logic to not send products already favorites / underserved
    if (bookmarked) {
      addFavoriteCacheIds = addFavoriteCacheIds.filter(i => i.productID !== productInfo.product.id)
      if (productInfo.product.bookmarked !== !bookmarked) {
        removeFavoriteCacheIds.push({ productID: productInfo.product.id, niche: productInfo.product.category })
      }
    } else {
      removeFavoriteCacheIds = removeFavoriteCacheIds.filter(i => i.productID !== productInfo.product.id)
      if (productInfo.product.bookmarked !== !bookmarked) {
        addFavoriteCacheIds.push({ productID: productInfo.product.id, niche: productInfo.product.category })
      }
    }

    clearTimeout(favoriteCacheTimeout)
    favoriteCacheTimeout = setTimeout(async () => {
      if (addFavoriteCacheIds.length > 0) {
        try {
          await sendMarketAddFavoriteProduct({ data: addFavoriteCacheIds })
          addFavoriteCacheIds.splice(0, addFavoriteCacheIds.length)
        } catch (error) {
          console.error(error)
        }
      }

      if (removeFavoriteCacheIds.length > 0) {
        try {
          await sendMarketRemoveFavoriteProduct({ data: removeFavoriteCacheIds })
          removeFavoriteCacheIds.splice(0, removeFavoriteCacheIds.length)
        } catch (error) {
          console.error(error)
        }
      }
    }, 3000)

    await addFavotireProductMutation.mutate(!bookmarked)
  }

  return (
    <Button
      className="favorite-dropdown-card__button _position-absolute"
      variation="tertiary"
      onClick={event => handleClickToggleFavorite(event, bookmarked)}
    >
      <Icon
        className={`favorite-dropdown-card__icon ${bookmarked ? '_text-brand-primary-light' : '_text-gray-800'}`}
        type={bookmarked ? 'solid' : 'regular'}
        iconName="heart"
        width={16}
        height={16}
      />
    </Button>
  )
}

export default FavoriteButton
