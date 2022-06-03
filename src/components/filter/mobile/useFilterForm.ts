import { useReducer } from 'react'

import { useSelector } from 'react-redux'

import { RootState } from 'ducks/index'

import { DefaultFilterValues } from 'utils/constants'

const Types = {
  AFFILIATION_RULE: 'currentSelectedAffiliationRule',
  AFFILIATION_TYPE: 'currentSelectedAffiliationType',
  CATEGORY: 'currentSelectedCategory',
  COMMISSION_RANGE: 'currentSelectedCommissionRange',
  COUNTRY: 'currentSelectedCountry',
  CURRENCY: 'currentSelectedCurrency',
  FORMAT: 'currentSelectedFormat',
  LANGUAGE: 'currentSelectedLanguage',
  PRICE_RANGE: 'currentSelectedPriceRange',
  IS_SWITCH_ON: 'isSwitchOn',
  RESET: 'reset'
}

const addFilter = (state, key, value) => {
  return {
    ...state,
    [key]: value
  }
}

const resetFilters = () => {
  const newState = {
    currentSelectedAffiliationRule: DefaultFilterValues.DefaultAffiliationRule,
    currentSelectedAffiliationType: DefaultFilterValues.DefaultAffiliationType,
    currentSelectedCategory: DefaultFilterValues.DefaultCategory,
    currentSelectedCommissionRange: DefaultFilterValues.DefaultCommissionRange,
    currentSelectedCountry: DefaultFilterValues.DefaultCountry,
    currentSelectedCurrency: DefaultFilterValues.DefaultCurrency,
    currentSelectedFormat: DefaultFilterValues.DefaultFormat,
    currentSelectedLanguage: '',
    currentSelectedPriceRange: DefaultFilterValues.DefaultPriceRange,
    isSwitchOn: false
  }

  return newState
}

const reducer = (state, action) => {
  if (action.type !== Types.RESET) {
    return addFilter(state, action.type, action.value)
  }
  return resetFilters()
}

const useFilterForm = () => {
  const {
    isLanguageSwitchOn,
    selectedAffiliationRule,
    selectedAffiliationType,
    selectedCategory,
    selectedCommissionRange,
    selectedCountry,
    selectedCurrency,
    selectedFormat,
    selectedLanguage,
    selectedPriceRange
  } = useSelector(({ filters }: RootState) => filters)

  const initialState = {
    currentSelectedAffiliationRule: selectedAffiliationRule,
    currentSelectedAffiliationType: selectedAffiliationType,
    currentSelectedCategory: selectedCategory,
    currentSelectedCommissionRange: selectedCommissionRange,
    currentSelectedCountry: selectedCountry,
    currentSelectedCurrency: selectedCurrency,
    currentSelectedFormat: selectedFormat.id,
    currentSelectedLanguage: selectedLanguage,
    currentSelectedPriceRange: selectedPriceRange,
    isSwitchOn: isLanguageSwitchOn
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const setCurrentSelectedAffiliationRule = value => {
    dispatch({ type: Types.AFFILIATION_RULE, value })
  }

  const setCurrentSelectedAffiliationType = value => {
    dispatch({ type: Types.AFFILIATION_TYPE, value })
  }

  const setCurrentSelectedCategory = value => {
    dispatch({ type: Types.CATEGORY, value })
  }

  const setCurrentSelectedCommissionRange = value => {
    dispatch({ type: Types.COMMISSION_RANGE, value })
  }

  const setCurrentSelectedCountry = value => {
    dispatch({ type: Types.COUNTRY, value })
  }

  const setCurrentSelectedCurrency = value => {
    dispatch({ type: Types.CURRENCY, value })
  }

  const setCurrentSelectedFormat = value => {
    dispatch({ type: Types.FORMAT, value })
  }

  const setCurrentSelectedLanguage = value => {
    dispatch({ type: Types.LANGUAGE, value })
  }

  const setCurrentSelectedPriceRange = value => {
    dispatch({ type: Types.PRICE_RANGE, value })
  }

  const setIsSwitchOn = value => {
    dispatch({ type: Types.IS_SWITCH_ON, value })
  }

  const setInitialFormState = () => {
    dispatch({ type: Types.RESET })
  }

  return {
    values: state,
    setCurrentSelectedAffiliationRule,
    setCurrentSelectedAffiliationType,
    setCurrentSelectedCategory,
    setCurrentSelectedCommissionRange,
    setCurrentSelectedCountry,
    setCurrentSelectedCurrency,
    setCurrentSelectedFormat,
    setCurrentSelectedLanguage,
    setCurrentSelectedPriceRange,
    setIsSwitchOn,
    setInitialFormState
  }
}

export default useFilterForm
