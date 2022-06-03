import React from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { RootState } from 'ducks/index'
import { useFetchProductRatingQuery } from 'api/useFetchProductRatingQuery'
import { Loader } from 'components/basic'

import ProductComments from './ProductComments'
import ProductRating from './ProductRating'

const ProductOpinions = () => {
  const { t } = useTranslation()

  const detailsInfo = useSelector(({ product }: RootState) => product)

  const { productDetails, userProfile } = detailsInfo.details


  const { isLoading, isError, data } = useFetchProductRatingQuery({ productUcode: productDetails.ucode })

  if (isLoading) {
    return <Loader />
  }

  if (isError || !data || data.total === 0) {
    return null
  }

  return (
    <div className="_my-7">
      <h3 className="_text-3 _text-md-6 _text-gray-700">
        {t('client_rating.ratings')}
      </h3>

      <ProductRating rating={data} />

      <ProductComments
        productUcode={productDetails.ucode}
        producerUcode={userProfile.ucode}
        showButtonSeeMore
      />
    </div>
  )
}

export default ProductOpinions
