import React, { useMemo } from 'react'

import { Form } from 'components/basic'
import { useTranslation } from 'react-i18next'

import { ICurrency } from 'ducks/filters/filtesrInterfaces'

interface IPropTypes {
  handleSelectedCurrency: (language: string) => void,
  selectedCurrency: string,
  currencies: Array<ICurrency>
}

interface IRadioInfo {
  id: string,
  label: string,
  isChecked: boolean
}

const CurrencyMobile = ({ handleSelectedCurrency, currencies, selectedCurrency }: IPropTypes) => {
  const { t } = useTranslation()

  const currenciesList = useMemo(() => {
    const list: Array<IRadioInfo> = []

    currencies.forEach(currency => {
      list.push(
        {
          id: currency.id,
          label: t(`currencies.label_checkout_currency_${currency.id}`),
          isChecked: selectedCurrency === currency.id
        }
      )
    })

    return list
  }, [currencies, selectedCurrency, t])

  return (
    <Form.RadioGroup
      radios={currenciesList}
      group="currency"
      onChangeHandler={handleSelectedCurrency} />
  )
}

export default CurrencyMobile
