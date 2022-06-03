import { DefaultFilterValues } from 'utils/constants'
import { priceRange, affiliationType, affiliationRule, commissionRange } from 'components/filter/advancedFilters/labels'
import { toolsLabel } from './toolsLabel'
import { categoryLabels } from './categoryLabels'

const addFilterTags = {
  searchInput: (queryParams, tags, userInputValue) => {
    if (queryParams) {
      tags.push({ name: queryParams, id: 'input-search-tag' })
    } else if (userInputValue !== '') {
      tags.push({ name: userInputValue, id: 'input-search-tag' })
    }
  },
  locale: (queryLanguage, tags, selectedLanguage, t) => {
    if (queryLanguage && queryLanguage !== 'undefined') {
      tags.push({ name: t(`language.${queryLanguage}`), id: 'language-tag' })
    } else if (selectedLanguage) {
      tags.push({ name: t(`language.${selectedLanguage}`), id: 'language-tag' })
    }
  },
  commission: (queryCommissionRange, tags, selectedCommissionRange) => {
    if (queryCommissionRange) {
      const commissionLabel = commissionRange.find(commission => commission.value === queryCommissionRange)

      tags.push({ name: commissionLabel?.text, id: 'commission-tag' })
    } else if (selectedCommissionRange !== 'DEFAULT') {
      const commissionLabel = commissionRange.find(commission => commission.value === selectedCommissionRange)

      tags.push({ name: commissionLabel?.text, id: 'commission-tag' })
    }
  },
  currency: (queryCurrency, tags, selectedCurrency, t) => {
    if (queryCurrency) {
      tags.push({ name: t(`currencies.label_checkout_currency_${queryCurrency}`), id: 'currency-tag' })
    } else if (selectedCurrency !== '') {
      tags.push({ name: t(`currencies.label_checkout_currency_${selectedCurrency}`), id: 'currency-tag' })
    }
  },
  price: (queryPrice, tags, selectedPriceRange) => {
    if (queryPrice) {
      const priceLabel = priceRange.find(price => price.value === queryPrice)

      tags.push({ name: priceLabel?.text, id: 'price-tag' })
    } else if (selectedPriceRange !== 'RANGE_0') {
      const priceLabel = priceRange.find(price => price.value === selectedPriceRange)

      tags.push({ name: priceLabel?.text, id: 'price-tag' })
    }
  },
  countryId: (queryCountry, tags, selectedCountry) => {
    if (queryCountry) {
      tags.push({ name: queryCountry, id: 'country-tag' })
    } else if (selectedCountry !== '') {
      tags.push({ name: selectedCountry, id: 'country-tag' })
    }
  },
  affiliationType: (queryAffiliationType, tags, selectedAffiliationType) => {
    if (queryAffiliationType && queryAffiliationType.toString() !== DefaultFilterValues.DefaultAffiliationType) {
      const affiliationTypeLabel = affiliationType.find(affiliation =>
        affiliation.value === parseInt(queryAffiliationType)
      )

      tags.push({ name: affiliationTypeLabel?.text, id: 'affiliation-type-tag' })
    } else if (selectedAffiliationType.toString() !== DefaultFilterValues.DefaultAffiliationType) {
      const affiliationTypeLabel = affiliationType.find(affiliation =>
        affiliation.value === parseInt(selectedAffiliationType)
      )

      tags.push({ name: affiliationTypeLabel?.text, id: 'affiliation-type-tag' })
    }
  },
  cookieType: (queryAffitiationRule, tags, selectedAffiliationRule) => {
    if (queryAffitiationRule && queryAffitiationRule.toString() !== DefaultFilterValues.DefaultAffiliationRule) {
      const affiliationRuleLabel = affiliationRule.find(rule => rule.value === parseInt(queryAffitiationRule))

      tags.push({ name: affiliationRuleLabel?.text, id: 'affiliation-rule-tag' })
    } else if (selectedAffiliationRule.toString() !== DefaultFilterValues.DefaultAffiliationRule) {
      const affiliationRuleLabel = affiliationRule.find(rule => rule.value === parseInt(selectedAffiliationRule))

      tags.push({ name: affiliationRuleLabel?.text, id: 'affiliation-rule-tag' })
    }
  },
  productTools: (querySelectedTools, tags, selectedTools) => {
    if (querySelectedTools) {
      const toolsList = querySelectedTools.split(',')

      toolsList.forEach(tool => {
        const toolLabel = toolsLabel.find(toolElement => toolElement.value === tool)

        tags.push({ name: toolLabel?.text, id: tool })
      })
    } else if (selectedTools && selectedTools.length > 0) {
      selectedTools.forEach(tool => {
        const toolLabel = toolsLabel.find(toolElement => toolElement.value === tool)

        tags.push({ name: toolLabel?.text, id: tool })
      })
    }
  },
  selectedCategory: (querySelectedCategory, tags, selectedCategory, t) => {
    if (parseInt(querySelectedCategory) !== DefaultFilterValues.DefaultCategory.id) {
      const categoryLabel = categoryLabels.find(category => category.value === parseInt(querySelectedCategory))

      tags.push({ name: t(categoryLabel?.text), id: 'category-tag' })
    } else if (selectedCategory.id !== DefaultFilterValues.DefaultCategory.id) {
      const categoryLabel = categoryLabels.find(category => category.value === selectedCategory.id)

      tags.push({ name: t(categoryLabel?.text), id: 'category-tag' })
    }
  },
  selectedFormat: (querySelectedFormat, tags, selectedFormat, t, filters) => {
    if (querySelectedFormat) {
      const formatLabel = filters.formats.find(format => format.id === parseInt(querySelectedFormat))

      tags.push({ name: t(`product_details.${formatLabel.name}`), id: 'format-tag' })
    } else if (selectedFormat.id !== '0') {
      const formatLabel = filters.formats.find(format => format.id === parseInt(querySelectedFormat))

      tags.push({ name: t(`product_details.${formatLabel.name}`), id: 'format-tag' })
    }
  }
}

export const createTagsList = (filters, t) => {
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
    userInputValue,
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
  const queryCommissionRange = queryParams.get('commission')
  const querySelectedTools = queryParams.get('tools')
  const querySelectedFormat = queryParams.get('format')

  const tags = []

  addFilterTags.searchInput(querySearch, tags, userInputValue)
  addFilterTags.locale(queryLanguage, tags, selectedLanguage, t)
  addFilterTags.currency(queryCurrency, tags, selectedCurrency, t)
  addFilterTags.countryId(queryCountry, tags, selectedCountry)
  addFilterTags.price(queryPrice, tags, selectedPriceRange)
  addFilterTags.affiliationType(queryAffiliationType, tags, selectedAffiliationType)
  addFilterTags.cookieType(queryAffitiationRule, tags, selectedAffiliationRule)
  addFilterTags.commission(queryCommissionRange, tags, selectedCommissionRange)
  addFilterTags.productTools(querySelectedTools, tags, selectedTools)
  addFilterTags.selectedCategory(queryCategoryId, tags, selectedCategory, t)
  addFilterTags.selectedFormat(querySelectedFormat, tags, selectedFormat, t, filters)

  return tags
}
