import React, { useEffect } from 'react'

import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ProductsCardsPerPage, RouteNames } from 'utils/constants'

import { useFetchFavoritesQuery } from 'api/useFetchFavoritesQuery'

import { Card, Loader, Modal } from 'components/basic'
import { FavoriteEmptyList, FavoriteDataError } from 'components/favorite'
import FavoriteDropdownCard from './FavoriteDropdownCard'
import { removeUnmarkedBookmark } from '../FavoriteButton/helpers'

import './style.scss'

interface IFavoriteDropdown {
  isOpen: boolean,
  onClose: () => void
}

const FavoriteDropdown = ({ isOpen, onClose }: IFavoriteDropdown) => {
  const { t } = useTranslation()
  const client = useQueryClient()

  const totalProductsInDropdown = 3

  const { isLoading, isFetching, isError, data } = useFetchFavoritesQuery(
    { rows: ProductsCardsPerPage }
  )

  useEffect(() => {
    removeUnmarkedBookmark(client)
  }, [client])

  const renderContent = () => {
    if (isLoading || isFetching) {
      return <Loader />
    }

    if (isError || !data) {
      return <FavoriteDataError />
    }

    if (data.content.length === 0) {
      return <FavoriteEmptyList />
    }

    const products = data.content.slice(0, totalProductsInDropdown)

    return (
      <div className="_d-flex _flex-column _justify-content-between _align-self-stretch _flex-1">
        {products.map(productInformation => (
          <FavoriteDropdownCard
            key={productInformation.product.id.toString()}
            productInformation={productInformation}
          />
        ))}
        <Link
          className="_mt-5 _mb-3 _border-0 _text-2 _text-center"
          to={RouteNames.FAVORITE_RESULTS}
        >
          {t('general.see_all')}
        </Link>
      </div>
    )
  }

  return (
    <>
      <Card className={`favorite-dropdown _position-absolute _d-none ${isOpen ? '_d-md-flex' : ''}`}>
        <Card.Body className="_d-flex _align-items-center _justify-content-center _p-3">
          {
            renderContent()
          }
        </Card.Body>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} className="hot-dropdocked favorite-dropdown-modal _d-md-none">
        <Modal.Body className="favorite-dropdown-modal__body _d-flex _align-items-center _justify-content-center _p-3">
          {
            renderContent()
          }
        </Modal.Body>
      </Modal>
    </>
  )
}

export default FavoriteDropdown
