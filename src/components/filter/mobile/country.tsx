import React, { useMemo } from 'react'

import { Form } from 'components/basic'
import { useTranslation } from 'react-i18next'

import { ICountry } from 'ducks/filters/filtesrInterfaces'

interface IPropTypes {
  handleSelectedCountry: (language: string) => void,
  selectedCountry: string,
  countries: Array<ICountry>
}

interface ISelectOption {
  value: number,
  text: string
}

const CountryMobile = ({ handleSelectedCountry, countries, selectedCountry }: IPropTypes) => {
  const { t } = useTranslation()

  const countriesList = useMemo(() => {
    const list: Array<ISelectOption> = countries.map(country => {
      return ({ value: country.id, text: t(`${country.key}`) })
    })

    return list
  }, [countries, t])

  return (
    <div className="country-accordion-content">
      <Form.InputSelect
        id="countryFilter"
        value={selectedCountry}
        placeholder={t('filters.choose_an_option')}
        onChange={handleSelectedCountry}
        options={countriesList} />
    </div>
  )
}

export default CountryMobile
