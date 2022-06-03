import React, { ReactNode, useMemo } from 'react'

import { Form } from 'components/basic'

import { commissionRange } from 'components/filter/advancedFilters/commissionRange'

interface IPropTypes {
  handleSelectedCommissionRange: (commissionRange: string) => void,
  selectedCommissionRange: string
}

interface IRadioInfo {
  id: string,
  label: string | ReactNode,
  isChecked: boolean
}

const CommissionPercentageMobile = ({ handleSelectedCommissionRange, selectedCommissionRange }: IPropTypes) => {
  const commissionList = useMemo(() => {
    const list: Array<IRadioInfo> = []

    commissionRange.forEach(range => {
      if (range.value !== 'DEFAULT') {
        list.push(
          {
            id: range.value,
            label: range.text,
            isChecked: selectedCommissionRange === range.value
          }
        )
      }
    })

    return list
  }, [selectedCommissionRange])

  return (
    <Form.RadioGroup
      radios={commissionList}
      group="commissionRange"
      onChangeHandler={handleSelectedCommissionRange} />
  )
}

export default CommissionPercentageMobile
