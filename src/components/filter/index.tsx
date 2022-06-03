import React, { useRef, useState, useCallback } from 'react'

import { useQueryClient } from 'react-query'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useVulcanoContext } from 'src/VulcanoContext'
import { useSelector, useDispatch } from 'react-redux'

import AdvancedFilter from './advancedFilters'
import FilterCategories from './categories'

import useOutsideClick from 'utils/useOutsideClick'
import generateQueryParam from 'utils/generateQueryParams'

import { RouteNames, DefaultFilterValues, isMediumOrLowerScreen } from 'utils/constants'
import { setIsLanguageSwitchOn, setSelectedCategory, setUserInputValue, setSelectedPage } from 'ducks/filters'
import { Button, Form, Icon } from 'components/basic'
import { FavoriteDropdown } from 'components/favorite'
import { removeUnmarkedBookmark } from 'components/favorite/FavoriteButton/helpers'
import { RootState } from 'ducks/index'

import './style.scss'
interface IPropTypes {
  isResultPage?: boolean
  handleFilter: () => void
}

const Filter = ({ isResultPage, handleFilter }: IPropTypes) => {
  const { t } = useTranslation()
  const client = useQueryClient()

  const { categoriesList } = useSelector(({ categories }: RootState) => categories)
  const allCategories = [...categoriesList, DefaultFilterValues.DefaultCategory]

  const translatedCategories = allCategories.map(category => {
    return { id: category.id, name: t(category.name) }
  })

  const orderedCategories = translatedCategories.sort((a, b) => {
    return a.name < b.name ? -1 : 1
  })

  const { user } = useVulcanoContext()
  const userLanguage = user.profile.locale

  const dispatch = useDispatch()
  const history = useHistory()

  const searchInput = useRef<HTMLInputElement>(null)
  const categoryMenu = useRef<HTMLDivElement>(null)

  const { selectedCategory, isLanguageSwitchOn } = useSelector(({ filters }: RootState) => filters)

  const allFilterParams = useSelector(({ filters }: RootState) => filters)

  const [isOpenCategories, setIsOpenCategories] = useState<boolean>(false)
  const [isOpenFilterMore, setIsOpenFilterMore] = useState<boolean>(false)
  const [isOpenFavoriteMore, setIsOpenFavoriteMore] = useState<boolean>(false)

  const handleCategoryChange = category => {
    dispatch(setSelectedCategory(category))

    handleFilter()
  }

  const handleUserLanguageSwitch = useCallback(
    e => {
      if (isResultPage) {
        const params = generateQueryParam(allFilterParams, userLanguage)

        history.push(`${RouteNames.SEARCH_RESULTS}${params}`)
      } else {
        dispatch(setIsLanguageSwitchOn(e.target.checked))
      }
      handleFilter()
    },
    [allFilterParams, dispatch, handleFilter, history, isResultPage, userLanguage]
  )

  useOutsideClick(categoryMenu, () => {
    if (isOpenCategories) {
      setIsOpenCategories(false)
    }
  })

  const handleSearch = useCallback(() => {
    dispatch(setSelectedPage(1))
    const inputParams = searchInput.current?.value || ''

    dispatch(setUserInputValue(inputParams))
    const params = generateQueryParam(allFilterParams, userLanguage, inputParams)

    history.push(`${RouteNames.SEARCH_RESULTS}${params}`)
    handleFilter()
  }, [allFilterParams, dispatch, handleFilter, history, userLanguage])

  const handleKeyPressSearchInput = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleCloseFilterMore = () => {
    setIsOpenFilterMore(false)
  }

  const handleCloseFavoriteMore = () => {
    setIsOpenFavoriteMore(false)
    removeUnmarkedBookmark(client)
  }

  const handleFilterMore = () => {
    setIsOpenFilterMore(!isOpenFilterMore)

    if (isOpenFavoriteMore) {
      handleCloseFavoriteMore()
    }
  }

  const handleFavoriteMore = () => {
    if (isOpenFavoriteMore) {
      handleCloseFavoriteMore()
    } else {
      setIsOpenFavoriteMore(true)
    }

    if (isOpenFilterMore) {
      handleCloseFilterMore()
    }
  }

  const renderLanguageSwitch = () => {
    if (!isResultPage && !isMediumOrLowerScreen) {
      return (
        <Form.Switch
          id="productsInMyLanguage"
          className="_justify-self-end _m-0"
          checked={isLanguageSwitchOn}
          onChange={handleUserLanguageSwitch}
          label={t('filters.see_products_in_my_language')}
        />
      )
    }

    return ''
  }

  const renderFilterMore = () => {
    return (
      <Button className="_d-none _d-md-flex _mr-2" variation="tertiary" onClick={handleFilterMore}>
        <div className="_d-flex _align-items-center">
          <Icon type={isOpenFilterMore ? 'solid' : 'regular'} iconName="filter" width={16} height={16} />
          <span className="_ml-2 _text-2">{t('filters.more_filters')}</span>
        </div>
      </Button>
    )
  }

  const renderFavoriteMore = () => {
    return (
      <div className="_position-relative">
        <Button variation="tertiary" onClick={handleFavoriteMore}>
          <div className="_d-flex _align-items-center">
            <Icon type={isOpenFavoriteMore ? 'solid' : 'regular'} iconName="heart" width={16} height={16} />
            <span className="_ml-2 _text-2 _d-none _d-md-flex">{t('general.favorites')}</span>
          </div>
        </Button>
        <FavoriteDropdown isOpen={isOpenFavoriteMore} onClose={handleCloseFavoriteMore} />
      </div>
    )
  }

  const renderCategoryFilter = () => {
    if (!isMediumOrLowerScreen) {
      return (
        <div className="hot-col-lg-4 hot-col-md-12 _p-0 _mb-md-0 _mb-sm-3">
          <Button
            className={`_w-full _d-flex hot-form__input hot-form__input--lg categorie-border ${
              isOpenCategories ? 'categorie-border__clicked' : ''
            } search-wrapper__category _align-items-left`}
            onClick={() => setIsOpenCategories(!isOpenCategories)}
          >
            <div className="hot-col-11 _d-flex _justify-content-start _p-0 _text-gray-500">
              {selectedCategory ? t(selectedCategory.name) : t('general.categories')}
            </div>
            <div className="hot-col-1 _d-flex _justify-content-end _px-0 _text-gray-500">
              {isOpenCategories ? (
                <Icon type="solid" className="_mt-2" iconName="sort-up" />
              ) : (
                <Icon type="solid" iconName="sort-down" />
              )}
            </div>
          </Button>
        </div>
      )
    }

    return ''
  }

  return (
    <div className="hot-container _my-4 _p-0">
      <div className="_d-flex _w-full _align-items-center _px-1 _mb-4">{renderLanguageSwitch()}</div>
      <div className="_d-flex _align-items-center">
        <div className="_d-flex _flex-column _flex-grow-1">
          <div className="hot-row _d-flex _w-full _p-0 _m-0 search-wrapper">
            {renderCategoryFilter()}
            <div className="hot-col-lg-8 hot-col-md-12 _w-full p-0 _mb-0">
              <div className="hot-row _w-full _d-flex">
                <input
                  placeholder={t('general.search')}
                  ref={searchInput}
                  className={`hot-form__input search-border search-wrapper__term hot-form__input--${
                    isMediumOrLowerScreen ? 'sm' : 'lg'
                  }`}
                  onKeyDown={e => handleKeyPressSearchInput(e)}
                ></input>
                <div className="search-wrapper__buttons">
                  <Button
                    className={`hot-button${isMediumOrLowerScreen ? '' : '--lg'} search-wrapper__button-search`}
                    onClick={handleSearch}
                  >
                    <Icon className="_text-blue" type="regular" iconName="search" fontSize={2} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {isOpenCategories && (
            <div ref={categoryMenu} className="content _d-flex">
              <FilterCategories categories={orderedCategories} onChangeCategory={handleCategoryChange} />
            </div>
          )}
        </div>
        <div className="_d-flex _justify-content-between _pl-4">
          {renderFilterMore()}
          {renderFavoriteMore()}
        </div>
      </div>
      <div className="filter-wrapper _mt-2 _mb-4">
        <AdvancedFilter
          className={`${isOpenFilterMore ? '_d-flex' : '_d-none'} _bg-white`}
          onClickCloseFilterMore={handleCloseFilterMore}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  )
}

export default Filter
