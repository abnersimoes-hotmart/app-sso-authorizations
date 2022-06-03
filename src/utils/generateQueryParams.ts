import { DefaultFilterValues } from 'utils/constants'

const addParamsToQuery = (paramName, paramValue, compareParam, queryParams) => {
  if (compareParam) {
    queryParams = `${queryParams}&${paramName}=${paramValue}`
  }

  return queryParams
}

const addSelectedPage = (paramName, selectedPage, queryParams) => {
  let page = 1

  if (selectedPage > 0) {
    page = selectedPage
  }
  queryParams = `${queryParams}&${paramName}=${page}`
  return queryParams
}

const addInputParams = (userInputValue, queryParams, inputValue) => {
  if (inputValue) {
    queryParams = `${queryParams}&searchInput=${inputValue}`
  } else if (userInputValue !== '') {
    queryParams = `${queryParams}&searchInput=${userInputValue}`
  }

  return queryParams
}

const addOrderByParams = (selectedOrderBy, queryParams) => {
  if (selectedOrderBy !== '') {
    queryParams = `${queryParams}&orderBy=${selectedOrderBy}`
  }

  return queryParams
}

const addUserLanguage = (queryParams, selectedLanguage, isLanguageSwitchOn, userLanguage) => {
  let queryLanguage = queryParams

  if (isLanguageSwitchOn) {
    queryLanguage = `${queryParams}&userLanguage=${userLanguage}`
  } else if (selectedLanguage !== '') {
    queryLanguage = `${queryParams}&userLanguage=${selectedLanguage}`
  }

  return queryLanguage
}

const generateQueryParam = (filterParams, userLanguage, inputValue = '') => {
  let queryParams = `?categoryId=${filterParams.selectedCategory.id}`
  const {
    userInputValue,
    selectedLanguage,
    selectedCountry,
    selectedCurrency,
    selectedPriceRange,
    selectedAffiliationRule,
    selectedAffiliationType,
    selectedCommissionRange,
    isLanguageSwitchOn,
    selectedPage,
    selectedTools,
    selectedOrderBy,
    selectedFormat
  } = filterParams

  queryParams = addOrderByParams(selectedOrderBy, queryParams)
  queryParams = addInputParams(userInputValue, queryParams, inputValue)
  queryParams = addParamsToQuery('currency', selectedCurrency, selectedCurrency !== DefaultFilterValues.DefaultCurrency, queryParams)
  queryParams = addParamsToQuery('country', selectedCountry, selectedCountry !== DefaultFilterValues.DefaultCountry, queryParams)
  queryParams = addParamsToQuery('commission', selectedCommissionRange, selectedCommissionRange !== DefaultFilterValues.DefaultCommissionRange, queryParams)
  queryParams = addParamsToQuery('price', selectedPriceRange, selectedPriceRange !== DefaultFilterValues.DefaultPriceRange, queryParams)
  queryParams = addParamsToQuery('affiliationType', selectedAffiliationType, selectedAffiliationType.toString() !== DefaultFilterValues.DefaultAffiliationType, queryParams)
  queryParams = addParamsToQuery('affiliationRule', selectedAffiliationRule, selectedAffiliationRule.toString() !== DefaultFilterValues.DefaultAffiliationRule, queryParams)
  queryParams = addParamsToQuery('tools', selectedTools.toString(), selectedTools.length > 0, queryParams)
  queryParams = addParamsToQuery('format', selectedFormat.id, selectedFormat.id !== '0', queryParams)
  queryParams = addSelectedPage('page', selectedPage, queryParams)
  queryParams = addUserLanguage(queryParams, selectedLanguage, isLanguageSwitchOn, userLanguage)

  return queryParams
}

export default generateQueryParam
