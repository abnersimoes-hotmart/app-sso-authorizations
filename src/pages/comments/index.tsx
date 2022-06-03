import React, { Suspense, useCallback, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { RouteNames } from 'utils/constants'
import { setBreadcrumb } from 'ducks/breadcrumb'

import { useFetchProductRatingQuery } from 'api/useFetchProductRatingQuery'
import { Button, Icon, Loader } from 'components/basic'
import Header from 'components/header'
import ProductComments from 'components/product/ProductDetailsAbout/ProductOpinions/ProductComments'
import ProductRating from 'components/product/ProductDetailsAbout/ProductOpinions/ProductRating'

const CommentsResults = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const history = useHistory()

  const queryParams = new URLSearchParams(window.location.search)
  const productUcode = queryParams.get('productUcode') || ''
  const producerUcode = queryParams.get('producerUcode') || ''

  const { isLoading, isError, data } = useFetchProductRatingQuery({ productUcode })

  const productDetailsLink = `.${RouteNames.PRODUCT_DETAILS}?producerUcode=${producerUcode}&productUcode=${productUcode}`

  const generateBreadcrumb = useCallback(() => {
    const breadcrumb = [
      {
        item: t('general.title'),
        link: RouteNames.ROOT,
        isActive: false
      },
      {
        item: t('general.product'),
        link: productDetailsLink,
        isActive: false
      },
      {
        item: t('client_rating.product_rating'),
        link: `${RouteNames.COMMENTS_RESULTS}`,
        isActive: true
      }
    ]

    dispatch(setBreadcrumb(breadcrumb))
  }, [dispatch, productDetailsLink, t])

  const goBack = () => {
    history.push(productDetailsLink)
  }

  useEffect(() => {
    generateBreadcrumb()
  }, [generateBreadcrumb])

  if (isLoading) {
    return <Loader />
  }

  if (isError || !data) {
    return null
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="page-containers">
        <div className="hot-container">
          <div className="_d-flex _mt-5">
            <Button
              variation="tertiary"
              className="_px-2"
              onClick={goBack}>
              <Icon
                className="_mr-3"
                type="regular"
                width={16}
                height={16}
                iconName="arrow-left" />
              {t('general.go_back')}
            </Button>
          </div>

          <Header
            pageTitle="client_rating.product_rating"
            className="_mt-6 _mt-md-5"
          />

          <ProductRating rating={data} />

          <ProductComments
            pagination
            rows={8}
            producerUcode={producerUcode}
            productUcode={productUcode}
          />
        </div>
      </div>
    </Suspense>
  )
}

export default CommentsResults
