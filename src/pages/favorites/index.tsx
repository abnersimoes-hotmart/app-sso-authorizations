import React, { Suspense, useCallback, useEffect, useState } from 'react'

import { useQueryClient } from 'react-query'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { ProductsCardsPerPage, RouteNames } from 'utils/constants'
import { setBreadcrumb } from 'ducks/breadcrumb'

import { useFetchFavoritesQuery } from 'api/useFetchFavoritesQuery'

import Header from 'components/header'
import { Button, Icon, Loader, Pagination } from 'components/basic'
import { FavoriteDataError, FavoriteEmptyList } from 'components/favorite'
import { removeUnmarkedBookmark } from 'components/favorite/FavoriteButton/helpers'
import { ProductCard } from 'components/product'

const FavoriteResults = () => {
  const { t } = useTranslation()
  const client = useQueryClient()

  const dispatch = useDispatch()
  const history = useHistory()
  const queryParams = new URLSearchParams(window.location.search)

  const totalProductsPerPage = ProductsCardsPerPage

  const getParamsPage = parseInt((queryParams.get('page') || '1'), 10)
  const [selectedPage, setSelectedPage] = useState<number>(getParamsPage === 0 ? 1 : getParamsPage)
  const { isLoading, isFetching, isError, data } = useFetchFavoritesQuery(
    {
      page: selectedPage,
      rows: totalProductsPerPage,
      onSuccess: data => {
        if (selectedPage > 1 && data.content.length === 0) {
          handleSelectedPage(1)
        }
      }
    }
  )

  const handleSelectedPage = page => {
    setSelectedPage(page)
    history.push(`${RouteNames.FAVORITE_RESULTS}?page=${page}`)
  }

  const generateBreadcrumb = useCallback(() => {
    const breadcrumb = [
      {
        item: t('general.title'),
        link: RouteNames.ROOT,
        isActive: false
      },
      {
        item: t('general.my_favorites'),
        link: `${RouteNames.FAVORITE_RESULTS}`,
        isActive: true
      }
    ]

    dispatch(setBreadcrumb(breadcrumb))
  }, [dispatch, t])

  const goBack = () => {
    history.push(RouteNames.ROOT)
  }

  useEffect(() => {
    generateBreadcrumb()
    removeUnmarkedBookmark(client)
  }, [generateBreadcrumb, client])

  const renderResult = () => {
    if (isLoading || isFetching) {
      return <Loader />
    }

    if (isError || !data) {
      return (
        <div className="_py-8 _text-center">
          <FavoriteDataError />
          <Link to={RouteNames.ROOT} className="hot-button hot-button--primary _mt-4">
            {t('favorites.go_to_affiliate_market')}
          </Link>
        </div>
      )
    }


    if (data.content.length === 0) {
      return (
        <div className="_py-8 _text-center">
          <FavoriteEmptyList />
          <Link to={RouteNames.ROOT} className="hot-button hot-button--primary _mt-4">
            {t('favorites.go_to_affiliate_market')}
          </Link>
        </div>
      )
    }

    const products = selectedPage === 1 ? data.content.slice(0, totalProductsPerPage) : data.content

    const totalElements = data.totalElements || 0
    const pageSize = totalElements > data.content.length ? data.totalElements : data.content.length

    return (
      <>
        <div className="hot-row">
          {products.map(productInformation => {
            return (
              <div
                key={`product-card-${productInformation.product.id}`}
                className="hot-col-12 hot-col-md-6 hot-col-lg-4 hot-col-xl-3 _py-3"
              >
                <ProductCard
                  productInformation={productInformation}
                  favoritePage={selectedPage}
                />
              </div>
            )
          })}
        </div>
        <div className="_d-flex _justify-content-center _my-8">
          <Pagination
            size={totalProductsPerPage}
            activePage={selectedPage}
            totalPages={Math.ceil(pageSize / totalProductsPerPage)}
            onChangePage={handleSelectedPage}
          />
        </div>
      </>
    )
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="page-containers _pb-8">
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
            pageTitle="general.my_favorites"
            pageDescription="favorites.all_your_favorite_products"
            className="_mt-6 _mt-md-5"
          />
          {
            renderResult()
          }
        </div>
      </div>
    </Suspense>
  )
}

export default FavoriteResults
