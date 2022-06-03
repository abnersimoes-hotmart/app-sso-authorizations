import React, { useEffect, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useVulcanoContext } from 'src/VulcanoContext'
import { useSelector, useDispatch } from 'react-redux'

import {
  setCountries,
  setCurrencies,
  setLanguages,
  setFormats,
  setSelectedTools,
  setSelectedCountry,
  setSelectedCurrency,
  setInitialState,
  setSelectedLanguage,
  setSelectedFormat,
  setSelectedPriceRange,
  setSelectedCommissionRange,
  setSelectedAffiliationType,
  setSelectedAffiliationRule,
  setIsCheckedBonusDeliveryOption,
  setIsCheckedDivulgationMaterialOption,
  setIsCheckedAlternativeHotlinksOption,
  setIsCheckedAlternativeDinamicHotlinksOption,
  setIsCheckedHotleadsOption,
  setIsLanguageSwitchOn
} from 'ducks/filters'

import {
  Card,
  Button,
  Form,
  Icon,
  Loader
} from 'components/basic'

import {
  getFilterCurrencies,
  getFilterCountries,
  getFilterLanguages,
  getFilterProductFormats
} from 'services/market'

import { priceRange, affiliationType, affiliationRule, commissionRange } from './labels'

import './style.scss'
import { RootState } from 'ducks/index'

interface IPropTypes {
  onClickCloseFilterMore: () => void,
  className?: string,
  handleSearch: () => void
}

const AdvancedFilter = ({ className, onClickCloseFilterMore, handleSearch }: IPropTypes) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { user } = useVulcanoContext()
  const language = user.profile.locale

  const [isLoading, setIsLoading] = useState(true)

  const {
    currencies,
    countries,
    languages,
    formats,
    selectedLanguage,
    selectedFormat,
    selectedCountry,
    selectedCurrency,
    selectedPriceRange,
    selectedAffiliationRule,
    selectedAffiliationType,
    selectedCommissionRange,
    isCheckedBonusDeliveryOption,
    isCheckedDivulgationMaterialOption,
    isCheckedAlternativeHotlinksOption,
    isCheckedHotleadsOption,
    isCheckedAlternativeDinamicHotlinksOption
  } = useSelector(({ filters }: RootState) => filters)

  const currenciesOptions = () => {
    const currenciesList: Array<{value: string, text: string}> = []

    currencies.forEach(currency => {
      currenciesList.push({
        value: currency.id,
        text: t(`currencies.${currency.label}`)
      })
    })

    return currenciesList
  }

  const countriesOptions = () => {
    const countriesList: Array<{value: string, text: string}> = []

    countries.forEach(country => {
      countriesList.push({
        value: country.value,
        text: t(country.key)
      })
    })

    return countriesList
  }

  const languageOptions = () => {
    const languagesList: Array<{value: string, text: string}> = []

    languages.forEach(language => {
      languagesList.push({
        value: language.id,
        text: t(`language.${language.id}`)
      })
    })

    return languagesList
  }

  const formatOptions = () => {
    const formatList: Array<{value: string, text: string}> = []

    formats.forEach(format => {
      formatList.push({
        value: format.id,
        text: t(`product_details.${format.name}`)
      })
    })

    return formatList
  }

  const fetchFilters = useCallback(async () => {
    try {
      const responseCurrencies = await getFilterCurrencies()
      const responseCountries = await getFilterCountries()
      const responseLanguages = await getFilterLanguages()
      const responseFormats = await getFilterProductFormats()

      dispatch(setCurrencies(responseCurrencies))
      dispatch(setCountries(responseCountries))
      dispatch(setLanguages(responseLanguages))
      dispatch(setFormats(responseFormats))
    } catch {
      dispatch(setCurrencies([]))
      dispatch(setCountries([]))
      dispatch(setLanguages([]))
      dispatch(setFormats([]))
    }
  }, [dispatch])

  useEffect(() => {
    try {
      fetchFilters()
    } finally {
      setIsLoading(false)
    }
  }, [fetchFilters])

  const handleBonusDeliveryCheckbox = () => {
    dispatch(setIsCheckedBonusDeliveryOption(!isCheckedBonusDeliveryOption))
  }

  const handleAlternativeHotlinksCheckbox = () => {
    dispatch(setIsCheckedAlternativeHotlinksOption(!isCheckedAlternativeHotlinksOption))
  }

  const handleAlternativeDinamicHotlinksCheckbox = () => {
    dispatch(setIsCheckedAlternativeDinamicHotlinksOption(!isCheckedAlternativeDinamicHotlinksOption))
  }

  const handleDivulgationMaterialCheckbox = () => {
    dispatch(setIsCheckedDivulgationMaterialOption(!isCheckedDivulgationMaterialOption))
  }

  const handleHotleadsCheckbox = () => {
    dispatch(setIsCheckedHotleadsOption(!isCheckedHotleadsOption))
  }

  const handleApplyAdvancedFilters = () => {
    const tools: Array<string> = []

    if (isCheckedBonusDeliveryOption) {
      tools.push('ONLY_ALLOW_AFFILIATION_BONUS')
    }

    if (isCheckedAlternativeHotlinksOption) {
      tools.push('ONLY_ALTERNATIVE_PAGE')
    }

    if (isCheckedAlternativeDinamicHotlinksOption) {
      tools.push('ONLY_ALLOW_ALTERNATIVE_DYNAMIC_PAG')
    }

    if (isCheckedDivulgationMaterialOption) {
      tools.push('ONLY_AFFILIATE_RESOURCE')
    }

    if (isCheckedHotleadsOption) {
      tools.push('ONLY_HAS_HOTLEADS')
    }

    dispatch(setSelectedTools(tools))
    handleSearch()
    onClickCloseFilterMore()
  }

  const handleClearAdvancedFilters = () => {
    dispatch(setInitialState())
  }

  const handleSelectedLanguage = e => {
    const selectedLanguage = e.value

    if (selectedLanguage === language) {
      dispatch(setIsLanguageSwitchOn(true))
      dispatch(setSelectedLanguage(language))
    } else {
      dispatch(setIsLanguageSwitchOn(false))
    }

    dispatch(setSelectedLanguage(selectedLanguage))
  }

  const handleSelectedAffiliationType = e => {
    dispatch(setSelectedAffiliationType((e.value)))
  }

  const handleSelectedFormat = e => {
    dispatch(setSelectedFormat({ id: e.value, name: e.text }))
  }

  const handleSelectedCommissionRange = e => {
    dispatch(setSelectedCommissionRange(e.value))
  }

  const handleSelectedAffiliationRule = e => {
    dispatch(setSelectedAffiliationRule(e.value))
  }

  const handleSelectedPriceRange = e => {
    dispatch(setSelectedPriceRange(e.value))
  }

  const handleSelectedCurrency = e => {
    dispatch(setSelectedCurrency(e.value))
  }

  const handleSelectedCountry = e => {
    dispatch(setSelectedCountry(e.value))
  }

  return (
    <Card className={`${className} filter-more-card`}>
      <Card.Body className="_p-4">
        {isLoading
          ? <Loader />
          : <>
            <div className="_d-flex _align-items-center _justify-content-between">
              <h4 className="_mb-4">{t('filters.more_filters')}</h4>
              <Button
                onClick={() => onClickCloseFilterMore()}
                className="_d-flex _px-3 _border-0 _align-items-center"
                variation="terciary">
                <Icon type="regular" iconName="times" />
              </Button>
            </div>
            <div className="hot-row _my-3">
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputSelect
                  id="affiliationTypeFilter"
                  label={t('filters.labels.affiliation_type.title')}
                  value={selectedAffiliationType}
                  onChange={handleSelectedAffiliationType}
                  placeholder={t('filters.choose_an_option')}
                  options={affiliationType}
                />
              </div>
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputSelect
                  id="commission"
                  label={t('filters.labels.commission')}
                  value={selectedCommissionRange}
                  onChange={handleSelectedCommissionRange}
                  placeholder={t('filters.choose_an_option')}
                  options={commissionRange}
                />
              </div>
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputSelect
                  id="commissioningFilter"
                  label={t('filters.labels.affiliation_rule.title')}
                  value={selectedAffiliationRule}
                  onChange={handleSelectedAffiliationRule}
                  placeholder={t('filters.choose_an_option')}
                  options={affiliationRule}
                />
              </div>
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputSelect
                  id="languageFilter"
                  label={t('filters.labels.language')}
                  value={selectedLanguage}
                  placeholder={t('filters.choose_an_option')}
                  onChange={handleSelectedLanguage}
                  options={languageOptions() || []}
                />
              </div>
            </div>
            <div className="hot-row _my-3">
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputSelect
                  id="productFormatFilter"
                  label={t('filters.labels.product_format')}
                  value={`product_details.${selectedFormat.name}`}
                  placeholder={t('filters.choose_an_option')}
                  onChange={handleSelectedFormat}
                  options={formatOptions() || []}
                />
              </div>
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputSelect
                  id="priceFilter"
                  label={t('filters.labels.price')}
                  value={selectedPriceRange}
                  onChange={handleSelectedPriceRange}
                  placeholder={t('filters.choose_an_option')}
                  options={priceRange}
                />
              </div>
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputSelect
                  id="currencyFilter"
                  label={t('filters.labels.currency')}
                  value={selectedCurrency}
                  placeholder={t('filters.choose_an_option')}
                  onChange={handleSelectedCurrency}
                  options={currenciesOptions() || []}
                />
              </div>
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputSelect
                  id="countryFilter"
                  label={t('filters.labels.country')}
                  value={selectedCountry}
                  placeholder={t('filters.choose_an_option')}
                  onChange={handleSelectedCountry}
                  options={countriesOptions() || []}
                />
              </div>
            </div>
            <h4 className="_mb-4">{t('filters.tools')}</h4>
            <div className="hot-row _my-3">
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputCheckbox
                  onChange={handleBonusDeliveryCheckbox}
                  id="bonusDeliveryOption"
                  checked={isCheckedBonusDeliveryOption}
                  className="_mt-4 _text-gray-700"
                  label={t('filters.labels.bonus_delivery')}
                />
              </div>
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputCheckbox
                  onChange={handleAlternativeHotlinksCheckbox}
                  id="alternativeHotlinksOption"
                  checked={isCheckedAlternativeHotlinksOption}
                  className="_mt-4 _text-gray-700"
                  label={t('filters.labels.alternative_hotlinks')}
                />
              </div>
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputCheckbox
                  onChange={handleAlternativeDinamicHotlinksCheckbox}
                  id="alternativeDinamicHotlinksOption"
                  checked={isCheckedAlternativeDinamicHotlinksOption}
                  className="_mt-4 _text-gray-700"
                  label={t('filters.labels.alternative_dinamic_hotlinks')}
                />
              </div>
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputCheckbox
                  onChange={handleDivulgationMaterialCheckbox}
                  id="divulgationMaterialOption"
                  checked={isCheckedDivulgationMaterialOption}
                  className="_mt-4 _text-gray-700"
                  label={t('filters.labels.divulgation_material')}
                />
              </div>
              <div className="hot-col-lg-3 hot-col-sm-6">
                <Form.InputCheckbox
                  onChange={handleHotleadsCheckbox}
                  id="hotleadsOption"
                  checked={isCheckedHotleadsOption}
                  className="_mt-4 _text-gray-700"
                  label={t('general.hotleads')}
                />
              </div>
            </div>
            <div className="text-right">
              <hr/>
              <Button
                onClick={handleClearAdvancedFilters}
                variation="secondary"
                className="card-hotmart-area__button _mr-3">
                {t('general.clear')}
              </Button>
              <Button
                onClick={handleApplyAdvancedFilters}
                variation="primary"
                className="card-hotmart-area__button">
                {t('general.apply')}
              </Button>
            </div>
          </>}
      </Card.Body>
    </Card>
  )
}

export default AdvancedFilter
