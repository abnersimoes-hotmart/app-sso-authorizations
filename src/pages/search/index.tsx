import React, { Suspense, useCallback, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import { useVulcanoContext } from 'src/VulcanoContext'
import { RootState } from 'ducks/index'
import { setSelectedPage } from 'ducks/filters'
import { setBreadcrumb } from 'ducks/breadcrumb'
import { isSmallScreen, ProductsCardsPerPage, RouteNames } from 'utils/constants'
import { useFetchSearchQuery } from 'api/useFetchSearchQuery'

import { Button, Icon, Loader, Pagination } from 'components/basic'
import Header from 'components/header'
import Filter from 'components/filter'
import SearchResultList from 'components/searchResultList'

import '../style.scss'

const SearchResults = () => {
  const { t } = useTranslation()

  const { user } = useVulcanoContext()

  const userLanguage = user.profile.locale

  const dispatch = useDispatch()
  const history = useHistory()

  const filters = useSelector(({ filters }: RootState) => filters)

  const queryParams = new URLSearchParams(window.location.search)

  const fetchSearchQuery = useFetchSearchQuery(filters, userLanguage)

  const handleSelectedPage = page => {
    const option = queryParams.get('orderBy')

    dispatch(setSelectedPage(page))

    if (option) {
      history.push(`${RouteNames.SEARCH_RESULTS}?orderBy=${option}&page=${page}`)
    }

    handleFilter()
  }

  const handleFilter = () => {
    // Force Refetch Cache Loading
    setTimeout(() => {
      fetchSearchQuery.refetch()
    }, 200)
  }

  const generateBreadcrumb = useCallback(() => {
    const breadcrumb = [
      {
        item: t('general.title'),
        link: RouteNames.ROOT,
        isActive: false
      },
      {
        item: t('general.search_result'),
        link: `${RouteNames.SEARCH_RESULTS}`,
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
  }, [generateBreadcrumb])

  return (
    <Suspense fallback={<Loader />}>
      <div className="page-containers">
        {
          isSmallScreen && (
            <Button
              className="go-back-button _my-3 _p-4 _d-flex _border-0 _justify-content-start _align-items-center _text-4 _text-gray-700"
              onClick={goBack}>
              <Icon
                className="_mr-3"
                type="regular"
                fontSize={2}
                iconName="arrow-left" />
              {t('general.go_back')}
            </Button>
          )
        }
        <div className="hot-container">
          <Header pageTitle={'general.title'} className="_mt-7" />
        </div>

        <Filter handleFilter={handleFilter} isResultPage />
        <SearchResultList
          handleFilter={handleFilter}
          products={fetchSearchQuery.data?.content}
          totalSearchMatches={fetchSearchQuery.data?.totalElements}
          isLoading={fetchSearchQuery.isFetching}
        />
        <div className="_d-flex _justify-content-center _my-8">
          <Pagination
            size={ProductsCardsPerPage}
            activePage={filters.selectedPage}
            totalPages={Math.ceil((fetchSearchQuery.data?.totalElements || 0) / ProductsCardsPerPage)}
            onChangePage={handleSelectedPage}
          />
        </div>
      </div>
    </Suspense>
  )
}

export default SearchResults
