import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ITag } from 'components/searchResultList/filterInterfaces'
import { useVulcanoContext } from 'src/VulcanoContext'
import { DefaultFilterValues, RouteNames } from 'utils/constants'

import generateQueryParam from 'utils/generateQueryParams'
import {
  setUserInputValue,
  setSelectedTools,
  setSelectedCountry,
  setSelectedCurrency,
  setSelectedLanguage,
  setSelectedFormat,
  setSelectedCommissionRange,
  setSelectedAffiliationType,
  setSelectedAffiliationRule,
  setSelectedPriceRange,
  setSelectedCategory,
  setIsLanguageSwitchOn,
  setIsCheckedAlternativeDinamicHotlinksOption,
  setIsCheckedBonusDeliveryOption,
  setIsCheckedAlternativeHotlinksOption,
  setIsCheckedDivulgationMaterialOption,
  setIsCheckedHotleadsOption
} from 'ducks/filters'
import { RootState } from 'ducks/index'

const useRemoveFilterTags = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { user } = useVulcanoContext()
  const userLanguage = user.profile.locale
  const filters = useSelector(({ filters }: RootState) => filters)

  const updateURL = () => {
    const params = generateQueryParam(filters, userLanguage)

    history.push(`${RouteNames.SEARCH_RESULTS}${params}`)
  }

  const removeFilterTags = {
    searchInput: (removedTagId: string, currentTags: Array<ITag>) => {
      let tags = currentTags

      if (removedTagId === 'input-search-tag') {
        tags = currentTags.filter(tag => tag.id !== 'input-search-tag')
        dispatch(setUserInputValue(''))
      }
      return tags
    },
    locale: (removedTagId: string, currentTags: Array<ITag>) => {
      let tags = currentTags

      if (removedTagId === 'language-tag') {
        tags = currentTags.filter(tag => tag.id !== 'language-tag')
        dispatch(setIsLanguageSwitchOn(false))
        dispatch(setSelectedLanguage(''))
      }
      return tags
    },
    commission: (removedTagId: string, currentTags: Array<ITag>) => {
      let tags = currentTags

      if (removedTagId === 'commission-tag') {
        tags = currentTags.filter(tag => tag.id !== 'commission-tag')
        dispatch(setSelectedCommissionRange(DefaultFilterValues.DefaultCommissionRange))
      }
      return tags
    },
    currency: (removedTagId: string, currentTags: Array<ITag>) => {
      let tags = currentTags

      if (removedTagId === 'currency-tag') {
        tags = currentTags.filter(tag => tag.id !== 'currency-tag')
        dispatch(setSelectedCurrency(DefaultFilterValues.DefaultCurrency))
      }
      return tags
    },
    price: (removedTagId: string, currentTags: Array<ITag>) => {
      let tags = currentTags

      if (removedTagId === 'price-tag') {
        tags = currentTags.filter(tag => tag.id !== 'price-tag')
        dispatch(setSelectedPriceRange(DefaultFilterValues.DefaultPriceRange))
      }
      return tags
    },
    countryId: (removedTagId: string, currentTags: Array<ITag>) => {
      let tags = currentTags

      if (removedTagId === 'country-tag') {
        tags = currentTags.filter(tag => tag.id !== 'country-tag')
        dispatch(setSelectedCountry(DefaultFilterValues.DefaultCountry))
      }
      return tags
    },
    affiliationType: (removedTagId: string, currentTags: Array<ITag>) => {
      let tags = currentTags

      if (removedTagId === 'affiliation-type-tag') {
        tags = currentTags.filter(tag => tag.id !== 'affiliation-type-tag')
        dispatch(setSelectedAffiliationType(DefaultFilterValues.DefaultAffiliationType))
      }
      return tags
    },
    cookieType: (removedTagId: string, currentTags: Array<ITag>) => {
      const isRemovedTagIdAffiliationRuleTag = removedTagId === 'affiliation-rule-tag'
      const tags = isRemovedTagIdAffiliationRuleTag ? currentTags.filter(tag => tag.id === 'affiliation-rule-tag') : currentTags

      if (isRemovedTagIdAffiliationRuleTag) {
        dispatch(setSelectedAffiliationRule(DefaultFilterValues.DefaultAffiliationRule))
      }
      return tags
    },
    productTools: (removedTagId: string, currentTags: Array<ITag>) => {
      const tags = currentTags.filter(tag => tag.id === removedTagId)
      const toolsArray = filters.selectedTools.filter(tool => tool !== removedTagId)

      if (removedTagId === 'ONLY_ALLOW_AFFILIATION_BONUS') {
        dispatch(setIsCheckedBonusDeliveryOption(false))
      }

      if (removedTagId === 'ONLY_ALTERNATIVE_PAGE') {
        dispatch(setIsCheckedAlternativeHotlinksOption(false))
      }

      if (removedTagId === 'ONLY_ALLOW_ALTERNATIVE_DYNAMIC_PAG') {
        dispatch(setIsCheckedAlternativeDinamicHotlinksOption(false))
      }

      if (removedTagId === 'ONLY_AFFILIATE_RESOURCE') {
        dispatch(setIsCheckedDivulgationMaterialOption(false))
      }

      if (removedTagId === 'ONLY_HAS_HOTLEADS') {
        dispatch(setIsCheckedHotleadsOption(false))
      }

      dispatch(setSelectedTools(toolsArray))

      return tags
    },
    selectedCategory: (removedTagId: string, currentTags: Array<ITag>) => {
      let tags = currentTags

      if (removedTagId === 'category-tag') {
        tags = currentTags.filter(tag => tag.id !== 'category-tag')
        dispatch(setSelectedCategory(DefaultFilterValues.DefaultCategory))
      }
      return tags
    },
    selectedFormat: (removedTagId: string, currentTags: Array<ITag>) => {
      let tags = currentTags

      if (removedTagId === 'format-tag') {
        tags = currentTags.filter(tag => tag.id !== 'format-tag')
        dispatch(setSelectedFormat(DefaultFilterValues.DefaultFormat))
      }
      return tags
    }
  }

  const removeTags = (tags, removedTagId, handleSearchTags) => {
    removeFilterTags.searchInput(removedTagId, tags)
    removeFilterTags.locale(removedTagId, tags)
    removeFilterTags.currency(removedTagId, tags)
    removeFilterTags.countryId(removedTagId, tags)
    removeFilterTags.price(removedTagId, tags)
    removeFilterTags.affiliationType(removedTagId, tags)
    removeFilterTags.cookieType(removedTagId, tags)
    removeFilterTags.commission(removedTagId, tags)
    removeFilterTags.productTools(removedTagId, tags)
    removeFilterTags.selectedCategory(removedTagId, tags)
    removeFilterTags.selectedFormat(removedTagId, tags)

    handleSearchTags()
    updateURL()
  }

  return removeTags
}

export default useRemoveFilterTags
