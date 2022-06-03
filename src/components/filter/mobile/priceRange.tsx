import React, { ReactNode, useMemo } from 'react'

import { Form } from 'components/basic'

import { priceRange } from 'components/filter/advancedFilters/priceRange'

interface IPropTypes {
  handleSelectedPriceRange: (commissionRange: string) => void,
  selectedPriceRange: string
}

interface IRadioInfo {
  id: string,
  label: string | ReactNode,
  isChecked: boolean
}


const DEFAULT_RANGE = 'RANGE_0'

const PriceRangeMobile = ({ handleSelectedPriceRange, selectedPriceRange }: IPropTypes) => {
  const priceList = useMemo(() => {
    const list: Array<IRadioInfo> = []

    priceRange.forEach(range => {
      if (range.value !== DEFAULT_RANGE) {
        list.push(
          {
            id: range.value,
            label: range.text,
            isChecked: selectedPriceRange === range.value
          }
        )
      }
    })

    return list
  }, [selectedPriceRange])

  return (
    <Form.RadioGroup
      radios={priceList}
      group="priceRange"
      onChangeHandler={handleSelectedPriceRange} />
  )
}

export default PriceRangeMobile
