import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultFilterValues } from 'utils/constants'
import { ICountry, ICurrency, ILanguage, IFormat } from './filtesrInterfaces'
import { ICategory } from 'utils/interfaces/productInformation'
export interface IFilters {
  countries: Array<ICountry>,
  currencies: Array<ICurrency>,
  languages: Array<ILanguage>,
  formats: Array<IFormat>,
  selectedOrderBy: string
  selectedTools: Array<string>,
  userInputValue: string,
  selectedCategory: ICategory,
  selectedPage: number,
  selectedPriceRange: string,
  selectedCommissionRange?: string,
  selectedAffiliationType?: number | string,
  selectedAffiliationRule?: number | string,
  selectedCountry: string,
  selectedCurrency: string,
  selectedLanguage: string,
  selectedFormat: IFormat,
  isLanguageSwitchOn: boolean,
  isCheckedBonusDeliveryOption: boolean,
  isCheckedDivulgationMaterialOption: boolean,
  isCheckedAlternativeHotlinksOption: boolean,
  isCheckedAlternativeDinamicHotlinksOption: boolean,
  isCheckedHotleadsOption: boolean
}

const initialState: IFilters = {
  countries: [],
  currencies: [],
  languages: [],
  formats: [],
  selectedTools: [],
  selectedOrderBy: '',
  userInputValue: '',
  selectedPriceRange: DefaultFilterValues.DefaultPriceRange,
  selectedCommissionRange: DefaultFilterValues.DefaultCommissionRange,
  selectedCategory: DefaultFilterValues.DefaultCategory,
  selectedPage: 1,
  selectedAffiliationType: DefaultFilterValues.DefaultAffiliationType,
  selectedAffiliationRule: DefaultFilterValues.DefaultAffiliationRule,
  selectedCountry: DefaultFilterValues.DefaultCountry,
  selectedCurrency: DefaultFilterValues.DefaultCurrency,
  selectedLanguage: '',
  selectedFormat: DefaultFilterValues.DefaultFormat,
  isLanguageSwitchOn: true,
  isCheckedBonusDeliveryOption: false,
  isCheckedDivulgationMaterialOption: false,
  isCheckedAlternativeHotlinksOption: false,
  isCheckedAlternativeDinamicHotlinksOption: false,
  isCheckedHotleadsOption: false
}

const allotmentSlice = createSlice({
  name: 'advancedFilters',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Array<ICountry>>) => {
      return { ...state, countries: action.payload }
    },
    setCurrencies: (state, action: PayloadAction<Array<ICurrency>>) => {
      return { ...state, currencies: action.payload }
    },
    setLanguages: (state, action: PayloadAction<Array<ILanguage>>) => {
      return { ...state, languages: action.payload }
    },
    setFormats: (state, action: PayloadAction<Array<IFormat>>) => {
      return { ...state, formats: action.payload }
    },
    setSelectedOrderBy: (state, action: PayloadAction<string>) => {
      return { ...state, selectedOrderBy: action.payload }
    },
    setUserInputValue: (state, action: PayloadAction<string>) => {
      return { ...state, userInputValue: action.payload }
    },
    setSelectedTools: (state, action: PayloadAction<Array<string>>) => {
      return { ...state, selectedTools: action.payload }
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      return { ...state, selectedCountry: action.payload }
    },
    setSelectedCurrency: (state, action: PayloadAction<string>) => {
      return { ...state, selectedCurrency: action.payload }
    },
    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      return { ...state, selectedLanguage: action.payload }
    },
    setSelectedFormat: (state, action: PayloadAction<IFormat>) => {
      return { ...state, selectedFormat: action.payload }
    },
    setSelectedPriceRange: (state, action: PayloadAction<string>) => {
      return { ...state, selectedPriceRange: action.payload }
    },
    setSelectedCommissionRange: (state, action: PayloadAction<string>) => {
      return { ...state, selectedCommissionRange: action.payload }
    },
    setSelectedAffiliationType: (state, action: PayloadAction<number | string>) => {
      return { ...state, selectedAffiliationType: action.payload }
    },
    setSelectedAffiliationRule: (state, action: PayloadAction<number | string>) => {
      return { ...state, selectedAffiliationRule: action.payload }
    },
    setIsLanguageSwitchOn: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLanguageSwitchOn: action.payload }
    },
    setIsCheckedBonusDeliveryOption: (state, action: PayloadAction<boolean>) => {
      return { ...state, isCheckedBonusDeliveryOption: action.payload }
    },
    setIsCheckedDivulgationMaterialOption: (state, action: PayloadAction<boolean>) => {
      return { ...state, isCheckedDivulgationMaterialOption: action.payload }
    },
    setIsCheckedHotleadsOption: (state, action: PayloadAction<boolean>) => {
      return { ...state, isCheckedHotleadsOption: action.payload }
    },
    setIsCheckedAlternativeHotlinksOption: (state, action: PayloadAction<boolean>) => {
      return { ...state, isCheckedAlternativeHotlinksOption: action.payload }
    },
    setIsCheckedAlternativeDinamicHotlinksOption: (state, action: PayloadAction<boolean>) => {
      return { ...state, isCheckedAlternativeDinamicHotlinksOption: action.payload }
    },
    setSelectedCategory: (state, action: PayloadAction<ICategory>) => {
      return { ...state, selectedCategory: action.payload }
    },
    setSelectedPage: (state, action: PayloadAction<number>) => {
      return { ...state, selectedPage: action.payload }
    },
    setInitialState: state => {
      return {
        ...state,
        selectedTools: [],
        selectedOrderBy: '',
        userInputValue: '',
        selectedPriceRange: DefaultFilterValues.DefaultPriceRange,
        selectedCommissionRange: DefaultFilterValues.DefaultCommissionRange,
        selectedCategory: DefaultFilterValues.DefaultCategory,
        selectedPage: 1,
        selectedAffiliationType: DefaultFilterValues.DefaultAffiliationType,
        selectedAffiliationRule: DefaultFilterValues.DefaultAffiliationRule,
        selectedCountry: DefaultFilterValues.DefaultCountry,
        selectedCurrency: DefaultFilterValues.DefaultCurrency,
        selectedLanguage: '',
        selectedFormat: DefaultFilterValues.DefaultFormat,
        isLanguageSwitchOn: true,
        isCheckedBonusDeliveryOption: false,
        isCheckedDivulgationMaterialOption: false,
        isCheckedAlternativeHotlinksOption: false,
        isCheckedAlternativeDinamicHotlinksOption: false
      }
    },
    setAllFilters: (state, action: PayloadAction<IFilters>) => {
      const newState = { ...state, ...action.payload }

      return newState
    }
  }
})

export const {
  setCountries,
  setCurrencies,
  setLanguages,
  setFormats,
  setInitialState,
  setSelectedOrderBy,
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
  setIsLanguageSwitchOn,
  setIsCheckedBonusDeliveryOption,
  setIsCheckedDivulgationMaterialOption,
  setIsCheckedAlternativeHotlinksOption,
  setIsCheckedAlternativeDinamicHotlinksOption,
  setIsCheckedHotleadsOption,
  setSelectedCategory,
  setSelectedPage,
  setAllFilters } = allotmentSlice.actions
export default allotmentSlice.reducer
