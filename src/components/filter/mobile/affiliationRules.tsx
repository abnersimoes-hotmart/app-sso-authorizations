import React, { ReactNode, useMemo } from 'react'

import { Form } from 'components/basic'

import { affiliationRule } from 'components/filter/advancedFilters/affiliationRule'

interface IPropTypes {
  handleSelectedAffiliationRule: (affiliationRule: string) => void,
  selectedAffiliationRule: number
}

interface IRadioInfo {
  id: string | number,
  label: string | ReactNode,
  isChecked: boolean
}

const NO_AFFILIATION_RULE = -1

const AffiliationRuleMobile = ({ handleSelectedAffiliationRule, selectedAffiliationRule }: IPropTypes) => {
  const affiliationRuleList = useMemo(() => {
    const list: Array<IRadioInfo> = []

    affiliationRule.forEach(type => {
      if (type.value !== NO_AFFILIATION_RULE) {
        list.push(
          {
            id: type.value,
            label: type.text,
            isChecked: selectedAffiliationRule === type.value
          }
        )
      }
    })

    return list
  }, [selectedAffiliationRule])

  return (
    <Form.RadioGroup
      radios={affiliationRuleList}
      group="affiliationRule"
      onChangeHandler={handleSelectedAffiliationRule} />
  )
}

export default AffiliationRuleMobile
