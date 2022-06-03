import React, { useState, useCallback, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useVulcanoContext } from 'src/VulcanoContext'
import { useSelector, useDispatch } from 'react-redux'

import { createTagsList } from './filterTags'
import { orderOptions } from './orderOptions'
import { NoProduct } from 'components/general'
import { ITag } from './filterInterfaces'
import { useRemoveFilterTags } from 'src/custom-hooks'
import { IProductInformation } from 'utils/interfaces/productInformation'
import { getIsSpecialCampaignActive } from 'services/market'
import { setSelectedOrderBy, setInitialState, setIsLanguageSwitchOn } from 'ducks/filters'
import { DefaultFilterValues, isSmallScreen, LanguagesToShowSpecialCampaign, RouteNames, WindowSize } from 'utils/constants'
import { Tag, Icon, Button, Loader, Form } from 'components/basic'

import ProductCard from '../product/ProductCard'
import TagCarousel from 'components/filter/mobile/mobileTagCarrousel'
import generateQueryParam from 'utils/generateQueryParams'
import { getCurrentSpecialCampaignByDateAndLocale } from 'utils/specialCampaign'

import OrderByOptionsModal from './orderByOptions'
import FilterOptionsModal from '../filter/mobile/filterOptions'
import { RootState } from 'ducks/index'

import './style.scss'

interface IPropTypes {
  products?: Array<IProductInformation>,
  totalSearchMatches?: number,
  isLoading: boolean,
  handleFilter: () => void
}

const specialCampaign = (queryOrderBy: string | null, isSpecialCampaignActive: boolean) => {
  return queryOrderBy?.includes('specialCampaign') && isSpecialCampaignActive
}

const SearchResultList = ({ products = [], totalSearchMatches = 0, isLoading, handleFilter }: IPropTypes) => {
  const { t } = useTranslation()

  const history = useHistory()
  const dispatch = useDispatch()

  const queryParams = new URLSearchParams(window.location.search)
  const queryOrderBy = queryParams.get('orderBy')

  const { user } = useVulcanoContext()
  const userLanguage = user.profile.locale

  const currentSpecialCampaign = getCurrentSpecialCampaignByDateAndLocale(userLanguage)

  const { categoriesList } = useSelector(({ categories }: RootState) => categories)
  const { selectedCategory, selectedOrderBy } = useSelector(({ filters }: RootState) => filters)

  const filters = useSelector(({ filters }: RootState) => filters)

  const [tags, setTags] = useState<Array<ITag>>([])
  const [isOpenOrderBy, setIsOpenOrderBy] = useState(false)
  const [isOpenFilterOptions, setIsOpenFilterOptions] = useState(false)
  const [isSpecialCampaignActive, setIsSpecialCampaignActive] = useState(false)

  const isSpecialCampaign = specialCampaign(queryOrderBy, isSpecialCampaignActive)
  const removeTags = useRemoveFilterTags()

  const handleSearchTags = useCallback(() => {
    const params = generateQueryParam(filters, userLanguage, '')

    history.push(`${RouteNames.SEARCH_RESULTS}${params}`)
    const tags = createTagsList(filters, t)

    setTags(tags)
  }, [filters, history, t, userLanguage])

  useEffect(() => {
    handleSearchTags()
  }, [handleSearchTags])

  useEffect(() => {
    const fetchIsSpecialCampaignActive = async () => {
      if (currentSpecialCampaign) {
        const response = await getIsSpecialCampaignActive({ toggleName: currentSpecialCampaign?.toggleName })

        setIsSpecialCampaignActive(response && LanguagesToShowSpecialCampaign.includes(userLanguage))
      }
    }

    fetchIsSpecialCampaignActive()
  }, [userLanguage, currentSpecialCampaign])

  const removeAllTags = () => {
    dispatch(setInitialState())
    dispatch(setIsLanguageSwitchOn(false))
    handleSearchTags()
    handleFilter()
  }

  const getCategoryName = () => {
    let categoryName = ''

    if (selectedCategory.id === DefaultFilterValues.DefaultCategory.id) {
      categoryName = t('category.all.name')
    } else {
      const categoryElement = categoriesList.find(category => category.id === selectedCategory.id)

      categoryName = t(categoryElement?.name || '')
    }

    return categoryName
  }

  const handleUpdateOrder = useCallback(() => {
    const params = generateQueryParam(filters, userLanguage, '')

    history.push(`${RouteNames.SEARCH_RESULTS}${params}`)
  }, [filters, history, userLanguage])

  const handleSelectedOrderBy = e => {
    const selectedOrder = e.value

    if (selectedOrder !== queryOrderBy) {
      dispatch(setSelectedOrderBy(selectedOrder))

      handleUpdateOrder()
      handleFilter()
    }
  }

  const handleSetOrderBy = selectedOrder => {
    if (selectedOrder !== queryOrderBy) {
      dispatch(setSelectedOrderBy(selectedOrder))

      handleUpdateOrder()
      handleFilter()
    }
  }

  const renderProductsCards = () => {
    if (isLoading) {
      return <Loader />
    }
    if (window.innerWidth <= WindowSize.SMALL) {
      return (
        <div className="hot-col-12 _p-0">
          {
            products.map(productInformation => {
              return (
                <ProductCard
                  key={`product-card-${productInformation.product.id}`}
                  isSpecialCampaign={isSpecialCampaign}
                  isResultPage
                  productInformation={productInformation} />
              )
            })
          }
        </div>
      )
    }

    return (
      <div className="hot-row">
        { products.length > 0
          ? products.map(productInformation => {
            return (
              <div
                className="hot-col-xl-3 hot-col-lg-4 hot-col-md-6 hot-col-sm-12 _py-3"
                key={`product-card-${productInformation.product.id}`}>
                <ProductCard
                  key={`product-card-${productInformation.product.id}`}
                  isSpecialCampaign={isSpecialCampaign}
                  isResultPage={true}
                  productInformation={productInformation} />
              </div>
            )
          })
          : <NoProduct />}
      </div>
    )
  }

  const handleOpenOrderProducts = () => {
    setIsOpenOrderBy(true)
  }

  const handleOpenFilterOptions = () => {
    setIsOpenFilterOptions(true)
  }

  const handleCloseOrderProducts = () => {
    setIsOpenOrderBy(false)
  }

  const handleCloseFilterOptions = () => {
    setIsOpenFilterOptions(false)
  }

  const renderFilterTags = () => {
    if (isSmallScreen) {
      return (
        <TagCarousel
          tags={tags}
          removeTags={removeTags}
          onSearchTagsChange={() => {
            handleSearchTags()
            handleFilter()
          }}
        />
      )
    }

    return (
      tags.map(tag => {
        return (
          <Tag key={tag.id} id={tag.id} type="blue" dismissible={true} className="_mr-3 _pl-2 _pr-1 _py-1 _d-flex">
            <div className="_mr-2">{tag.name}</div>
            <Button
              key={`remove-${tag.id}`}
              id={`remove-${tag.id}`}
              className="tag-remove-button _bg-gray-200 _text-gray-500 _rounded-circle _border-0 _d-flex _align-items-center _justify-content-center _p-1 _m-0"
              onClick={() => removeTags(tags, tag.id, () => {
                handleSearchTags()
                handleFilter()
              })}>
              <Icon type="regular" iconName="times" className="tag-remove-button" />
            </Button>
          </Tag>
        )
      })
    )
  }

  return (
    <div className="hot-container">
      <div className="hot-row _align-items-center _border-bottom">
        <div className="hot-col-md-10 hot-col-sm-12">
          <h3>{filters.userInputValue ? filters.userInputValue : getCategoryName()}</h3>
          <p>
            {totalSearchMatches} {t('search.results')}
          </p>
        </div>
        <div className="hot-col-md-2 hot-col-sm-12">
          {
            !isSmallScreen && (
              <Form.InputSelect
                id="orderBy"
                label={t('general.order_by')}
                value={queryOrderBy || selectedOrderBy}
                onChange={handleSelectedOrderBy}
                placeholder={t('filters.choose_an_option')}
                inputClassName="_w-full"
                options={orderOptions(isSpecialCampaignActive, currentSpecialCampaign)}
              />
            )
          }
        </div>
      </div>
      {
        isSmallScreen && (
          <div className="hot-row _my-4">
            <div className="hot-col-6">
              <Button
                size="lg"
                className="_w-full _border-0"
                variation="secondary"
                onClick={() => handleOpenOrderProducts()}>
                <Icon type="regular" className="_mr-2" iconName="sort-alt" />
                {t('general.order')}
              </Button>
            </div>
            <div className="filter-button hot-col-6">
              <Button
                size="lg"
                className="_d-flex _w-full _border-0 _align-items-center _justify-content-center"
                variation="secondary"
                onClick={() => handleOpenFilterOptions()}>
                <div className="filter-notification _rounded-circle _bg-red _text-white _text-2 _mr-2 _d-flex _align-items-center _justify-content-center">
                  {tags.length}
                </div>
                <Icon type="regular" className="_mr-2" iconName="sliders-h" />
                {t('general.filters')}
              </Button>
            </div>
          </div>
        )
      }
      <OrderByOptionsModal
        isOpen={isOpenOrderBy}
        handleCloseModal={handleCloseOrderProducts}
        handleSetOrderBy={handleSetOrderBy} />

      <FilterOptionsModal
        isOpen={isOpenFilterOptions}
        handleCloseModal={handleCloseFilterOptions}
        handleSearchTags={() => {
          handleSearchTags()
          handleFilter()
        }} />

      <div className={`hot-row ${!isSmallScreen && '_mx-0 _my-5'} ${isSmallScreen && 'mobile-filter-wrapper _my-0 _bg-gray-200 _mb-2'} _d-flex _align-items-center`}>
        <div className={`_d-flex _w-full _my-3 ${isSmallScreen && '_px-2 mobile-filter'}`}>
          { renderFilterTags() }
        </div>
        {
          !isSmallScreen && (
            <Button data-testid="button-clear-all-filter-tags"
              className="clear-all text-decoration-none _mr-0"
              onClick={() => removeAllTags()}>
              {t('general.clear_filter')}
            </Button>
          )
        }
      </div>

      { renderProductsCards() }
    </div>
  )
}

export default SearchResultList
