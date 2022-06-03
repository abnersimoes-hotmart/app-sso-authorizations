import React from 'react'

import { DefaultFilterValues } from 'utils/constants'
import { useTranslation } from 'react-i18next'
import { useVulcanoContext } from 'src/VulcanoContext'
import { useDispatch, useSelector } from 'react-redux'

import { Accordion, Button, Form } from 'components/basic'

import useFilterForm from './useFilterForm'

import Modal from 'components/basic/Modal'
import ModalBody from 'components/basic/Modal/Body'
import ModalHeader from 'components/basic/Modal/Header'
import ModalFooter from 'components/basic/Modal/Footer'

import AffiliationRuleMobile from 'components/filter/mobile/affiliationRules'
import AffiliationTypesMobile from 'components/filter/mobile/affiliationType'
import CategoriesMobile from 'components/filter/mobile/category'
import CountryMobile from 'components/filter/mobile/country'
import CurrencyMobile from 'components/filter/mobile/currency'
import CommissionPercentageMobile from 'components/filter/mobile/commissionPercentage'
import LanguageMobile from 'components/filter/mobile/language'
import PriceRangeMobile from 'components/filter/mobile/priceRange'
import ProductFormatMobile from 'components/filter/mobile/productFormat'
import ToolsMobile from 'components/filter/mobile/tools'

import { setAllFilters, setInitialState } from 'ducks/filters'
import { RootState } from 'ducks/index'

interface IPropTypes {
  isOpen: boolean,
  handleCloseModal: () => void,
  handleSearchTags: () => void
}

const FilterOptionsModal = ({ isOpen, handleCloseModal, handleSearchTags }: IPropTypes) => {
  const { t } = useTranslation()
  const { user: { profile: { locale } } } = useVulcanoContext()

  const dispatch = useDispatch()

  const {
    countries,
    currencies,
    formats,
    languages,
    isCheckedBonusDeliveryOption,
    isCheckedAlternativeHotlinksOption,
    isCheckedAlternativeDinamicHotlinksOption,
    isCheckedDivulgationMaterialOption,
    isCheckedHotleadsOption,
    ...restFilters
  } = useSelector(({ filters }: RootState) => filters)

  const {
    values,
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
  } = useFilterForm()

  const {
    currentSelectedAffiliationRule,
    currentSelectedAffiliationType,
    currentSelectedCategory,
    currentSelectedCommissionRange,
    currentSelectedCountry,
    currentSelectedCurrency,
    currentSelectedFormat,
    currentSelectedLanguage,
    currentSelectedPriceRange,
    isSwitchOn
  } = values

  const handleApplyFilters = restFilters => {
    const selectedFormatId = currentSelectedFormat.toString().replace('product-format-', '')
    const productFormat = formats.find(format => format.id.toString() === selectedFormatId)

    const tools = [
      ...isCheckedBonusDeliveryOption ? ['ONLY_ALLOW_AFFILIATION_BONUS'] : [],
      ...isCheckedAlternativeHotlinksOption ? ['ONLY_ALTERNATIVE_PAGE'] : [],
      ...isCheckedAlternativeDinamicHotlinksOption ? ['ONLY_ALLOW_ALTERNATIVE_DYNAMIC_PAG'] : [],
      ...isCheckedDivulgationMaterialOption ? ['ONLY_AFFILIATE_RESOURCE'] : [],
      ...isCheckedHotleadsOption ? ['ONLY_HAS_HOTLEADS'] : []
    ]
    const newState = {
      selectedAffiliationRule: currentSelectedAffiliationRule,
      selectedAffiliationType: currentSelectedAffiliationType,
      selectedCategory: currentSelectedCategory,
      selectedCommissionRange: currentSelectedCommissionRange,
      selectedCountry: currentSelectedCountry,
      selectedCurrency: currentSelectedCurrency,
      selectedFormat: productFormat || DefaultFilterValues.DefaultFormat,
      selectedLanguage: currentSelectedLanguage,
      selectedPriceRange: currentSelectedPriceRange,
      selectedTools: tools,
      isLanguageSwitchOn: isSwitchOn
    }

    dispatch(setAllFilters({ ...restFilters, ...newState }))
    handleSearchTags()
    handleCloseModal()
  }

  const handleClearFilters = () => {
    setInitialFormState()
    dispatch(setInitialState())
    handleCloseModal()
  }

  const handleSelectedCategory = category => {
    setCurrentSelectedCategory(category)
  }

  const handleUserLanguage = e => {
    setIsSwitchOn(e.target.checked)

    if (e.target.checked) {
      setCurrentSelectedLanguage(locale)
    }
  }

  const handleSelectedAffiliationType = value => {
    setCurrentSelectedAffiliationType(value)
  }

  const handleSelectedLanguage = (language: string) => {
    if (language === locale) {
      setIsSwitchOn(true)
    } else {
      setIsSwitchOn(false)
    }

    setCurrentSelectedLanguage(language)
  }

  const handleSelectedCommissionRange = (range: string) => {
    setCurrentSelectedCommissionRange(range)
  }

  const handleSelectedAffiliationRule = (rule: string) => {
    setCurrentSelectedAffiliationRule(Number(rule))
  }

  const handleSelectedProductFormat = (value: string) => {
    setCurrentSelectedFormat(value)
  }

  const handleSelectedPriceRange = (value: string) => {
    setCurrentSelectedPriceRange(value)
  }

  const handleSelectedCurrency = (value: string) => {
    setCurrentSelectedCurrency(value)
  }

  const handleSelectedCountry = (value: string) => {
    setCurrentSelectedCountry(value)
  }

  return (
    <Modal
      className="_w-full hot-dropdocked"
      isOpen={isOpen}
      onClose={handleCloseModal}>
      <ModalHeader>
        <h4 className="_mb-0">
          {t('general.filter')}
        </h4>
      </ModalHeader>
      <ModalBody className="hot-modal__dialog _w-full _p-4">
        <div className="_border _rounded _my-3 _p-3">
          <Form.Switch
            id="productsInMyLanguage"
            className="_justify-self-end _m-0 _ml-md-5 _ml-sm-0"
            checked={isSwitchOn}
            onChange={handleUserLanguage}
            label={t('filters.see_products_in_my_language')} />
        </div>
        <div className="_my-3">
          <Accordion title="general.categories">
            <CategoriesMobile
              handleSelectedCategory={handleSelectedCategory}
              selectedCategory={currentSelectedCategory} />
          </Accordion>
        </div>
        <div className="_my-3">
          <Accordion title="filters.labels.affiliation_type.title">
            <AffiliationTypesMobile
              handleSelectedAffiliationType={handleSelectedAffiliationType}
              selectedAffiliationType={currentSelectedAffiliationType} />
          </Accordion>
        </div>
        <div className="_my-3">
          <Accordion title="general.language">
            <LanguageMobile
              selectedLanguage={currentSelectedLanguage}
              handleSelectedLanguage={handleSelectedLanguage}
              languages={languages} />
          </Accordion>
        </div>
        <div className="_my-3">
          <Accordion title="general.commission">
            <CommissionPercentageMobile
              handleSelectedCommissionRange={handleSelectedCommissionRange}
              selectedCommissionRange={currentSelectedCommissionRange} />
          </Accordion>
        </div>
        <div className="_my-3">
          <Accordion title="filters.labels.affiliation_rule.title">
            <AffiliationRuleMobile
              handleSelectedAffiliationRule={handleSelectedAffiliationRule}
              selectedAffiliationRule={currentSelectedAffiliationRule} />
          </Accordion>
        </div>
        <div className="_my-3">
          <Accordion title="general.format">
            <ProductFormatMobile
              handleSelectedProductFormat={handleSelectedProductFormat}
              selectedProductFormat={currentSelectedFormat}
              formats={formats} />
          </Accordion>
        </div>
        <div className="_my-3">
          <Accordion title="general.price">
            <PriceRangeMobile
              handleSelectedPriceRange={handleSelectedPriceRange}
              selectedPriceRange={currentSelectedPriceRange} />
          </Accordion>
        </div>
        <div className="_my-3">
          <Accordion title="filters.labels.currency">
            <CurrencyMobile
              handleSelectedCurrency={handleSelectedCurrency}
              currencies={currencies}
              selectedCurrency={currentSelectedCurrency} />
          </Accordion>
        </div>
        <div className="_my-3">
          <Accordion title="filters.labels.country">
            <CountryMobile
              handleSelectedCountry={handleSelectedCountry}
              countries={countries}
              selectedCountry={currentSelectedCountry} />
          </Accordion>
        </div>
        <div className="_my-3">
          <Accordion title="filters.tools">
            <ToolsMobile />
          </Accordion>
        </div>
      </ModalBody>
      <hr />
      <ModalFooter>
        <div className="hot-col-6 _p-0">
          <Button
            onClick={handleClearFilters}>
            {t('general.clear')}
          </Button>
        </div>
        <div className="hot-col-6 _p-0 _d-flex _justify-content-end">
          <Button
            variation="primary"
            onClick={() => handleApplyFilters(restFilters)}>
            {t('general.apply')}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default FilterOptionsModal
