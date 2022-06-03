import { Currencies } from './constants'

export const getMoneyFormat = (value, currency = Currencies.BRAZILIAN_REAL, locale = 'pt-BR') => {
  const priceValue = value || 0
  const currentCurrency = currency || Currencies.BRAZILIAN_REAL

  const UNICODE_NON_BREAKING_SPACE = String.fromCharCode(160)
  const USUAL_SPACE = String.fromCharCode(32)
  const MONEY_MASK = Intl.NumberFormat(locale.replace('_', '-'), { style: 'currency', currency: currentCurrency })

  return MONEY_MASK.format(priceValue).replace(UNICODE_NON_BREAKING_SPACE, USUAL_SPACE)
}
