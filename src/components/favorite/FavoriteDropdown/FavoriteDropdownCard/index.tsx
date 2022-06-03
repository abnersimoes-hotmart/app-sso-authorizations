import React from 'react'

import { Link } from 'react-router-dom'

import { RouteNames } from 'utils/constants'
import { handleImageError } from 'utils/productDefaultImage'
import { IProductInformation } from 'utils/interfaces/productInformation'

import { FavoriteButton } from 'components/favorite/index'

import './style.scss'

interface IFavoriteDropdownCard {
  productInformation: IProductInformation
}

const FavoriteDropdownCard = ({ productInformation }: IFavoriteDropdownCard) => {
  const bookmarked = productInformation.product.bookmarked

  const productLink = `.${RouteNames.PRODUCT_DETAILS}?producerUcode=${productInformation.producer.ucode}&productUcode=${productInformation.product.ucode}${productInformation.pullSessionId ? `&pullSessionId=${productInformation.pullSessionId}` : ''}&bookmarked=${bookmarked}`

  return (
    <Link
      className="favorite-dropdown-card _p-3 _d-flex _w-full _rounded _text-decoration-none"
      to={productLink}
    >
      <img
        className="favorite-dropdown-card__image"
        alt={productInformation.product.alt}
        src={productInformation.product.image}
        onError={handleImageError}
      />
      <div className="_d-flex _w-full _position-relative _px-3">
        <span className="favorite-dropdown-card__name _pr-6 _text-2 _text-gray-700">
          {productInformation.product.name}
        </span>
        <FavoriteButton
          bookmarked={bookmarked}
          productInfo={productInformation}
        />
      </div>
    </Link>
  )
}

export default FavoriteDropdownCard
