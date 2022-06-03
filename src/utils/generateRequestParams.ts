import { ProductsCardsPerPage, DefaultFilterValues } from 'utils/constants'

const requestParams = {
  searchInput: (queryParams, params, userInputValue) => {
    if (queryParams) {
      params.search = queryParams
    } else if (userInputValue !== '') {
      params.search = userInputValue
    }
  },
  locale: (queryLanguage, params, selectedLanguage, isLanguageSwitchOn, userLanguage) => {
    if (queryLanguage) {
      params.locale = queryLanguage
    } else if (selectedLanguage !== '') {
      if (isLanguageSwitchOn) {
        params.locale = userLanguage
      } else {
        params.locale = selectedLanguage
      }
    }
  },
  commission: (queryCommissionRange, params, selectedCommissionRange) => {
    if (queryCommissionRange) {
      params.commission = queryCommissionRange
    } else if (selectedCommissionRange !== 'DEFAULT') {
      params.commission = selectedCommissionRange
    }
  },
  currency: (queryCurrency, params, selectedCurrency) => {
    if (queryCurrency) {
      params.currency = queryCurrency
    } else if (selectedCurrency !== '') {
      params.currency = selectedCurrency
    }
  },
  price: (queryPrice, params, selectedPriceRange) => {
    if (queryPrice) {
      params.price = queryPrice
    } else if (selectedPriceRange !== 'RANGE_0') {
      params.price = selectedPriceRange
    }
  },
  countryId: (queryCountry, params, selectedCountry) => {
    if (queryCountry) {
      params.countryId = queryCountry
    } else if (selectedCountry !== '') {
      params.countryId = selectedCountry
    }
  },
  affiliationType: (queryAffiliationType, params, selectedAffiliationType) => {
    if (queryAffiliationType && queryAffiliationType !== DefaultFilterValues.DefaultAffiliationType) {
      params.affiliationType = parseInt(queryAffiliationType)
    } else if (selectedAffiliationType !== DefaultFilterValues.DefaultAffiliationType) {
      params.affiliationType = parseInt(selectedAffiliationType)
    }
  },
  cookieType: (queryAffitiationRule, params, selectedAffiliationRule) => {
    if (queryAffitiationRule && queryAffitiationRule !== DefaultFilterValues.DefaultAffiliationRule) {
      params.cookieType = parseInt(queryAffitiationRule)
    } else if (selectedAffiliationRule !== DefaultFilterValues.DefaultAffiliationRule) {
      params.cookieType = parseInt(selectedAffiliationRule)
    }
  },
  productTools: (querySelectedTools, params, selectedTools) => {
    if (querySelectedTools) {
      params.productTools = querySelectedTools
    } else if (selectedTools && selectedTools.length > 0) {
      params.productTools = selectedTools
    }
  },
  selectedPage: (querySelectedPage, params, selectedPage) => {
    if (querySelectedPage > 0) {
      params.page = querySelectedPage
    } else if (selectedPage > 0) {
      params.page = selectedPage
    } else {
      params.page = 1
    }
  },
  selectedCategory: (querySelectedCategory, params, selectedCategory) => {
    if (parseInt(querySelectedCategory) !== DefaultFilterValues.DefaultCategory.id) {
      params.categoryId = querySelectedCategory
    } else if (selectedCategory.id !== DefaultFilterValues.DefaultCategory.id) {
      params.categoryId = selectedCategory.id
    }
  },
  selectedFormat: (querySelectedFormat, params, selectedFormat) => {
    if (querySelectedFormat) {
      params.formatId = querySelectedFormat
    } else if (selectedFormat.id !== '0') {
      params.formatId = selectedFormat.id
    }
  },
  selectedOrderBy: (querySelectedOrderBy, params, selectedOrderBy) => {
    params.name = selectedOrderBy || querySelectedOrderBy || ''
  }
}

export const generateRequestParams = (filters, userLanguage) => {
  const queryParams = new URLSearchParams(window.location.search)

  const {
    selectedLanguage,
    selectedCountry,
    selectedCurrency,
    selectedPriceRange,
    selectedAffiliationRule,
    selectedAffiliationType,
    selectedCommissionRange,
    selectedTools,
    selectedCategory,
    selectedPage,
    selectedOrderBy,
    userInputValue,
    isLanguageSwitchOn,
    selectedFormat
  } = filters

  const querySearch = queryParams.get('searchInput')
  const queryLanguage = queryParams.get('userLanguage')
  const queryCategoryId = queryParams.get('categoryId')
  const queryCurrency = queryParams.get('currency')
  const queryCountry = queryParams.get('country')
  const queryPrice = queryParams.get('price')
  const queryAffiliationType = queryParams.get('affiliationType')
  const queryAffitiationRule = queryParams.get('affiliationRule')
  const queryCommissionRange = queryParams.get('commissionRange')
  const querySelectedTools = queryParams.get('productTools')
  const querySelectedPage = queryParams.get('page')
  const querySelectedOrderBy = queryParams.get('orderBy')
  const querySelectedFormat = queryParams.get('format')

  const params = {
    name: '',
    rows: ProductsCardsPerPage
  }

  requestParams.searchInput(querySearch, params, userInputValue)
  requestParams.locale(queryLanguage, params, selectedLanguage, isLanguageSwitchOn, userLanguage)
  requestParams.currency(queryCurrency, params, selectedCurrency)
  requestParams.countryId(queryCountry, params, selectedCountry)
  requestParams.price(queryPrice, params, selectedPriceRange)
  requestParams.affiliationType(queryAffiliationType, params, selectedAffiliationType)
  requestParams.cookieType(queryAffitiationRule, params, selectedAffiliationRule)
  requestParams.commission(queryCommissionRange, params, selectedCommissionRange)
  requestParams.productTools(querySelectedTools, params, selectedTools)
  requestParams.selectedPage(querySelectedPage, params, selectedPage)
  requestParams.selectedCategory(queryCategoryId, params, selectedCategory)
  requestParams.selectedOrderBy(querySelectedOrderBy, params, selectedOrderBy)
  requestParams.selectedFormat(querySelectedFormat, params, selectedFormat)

  return params
}
