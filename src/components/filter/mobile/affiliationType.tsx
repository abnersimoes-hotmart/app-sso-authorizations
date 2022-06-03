import React from 'react'

import { affiliationType } from 'components/filter/advancedFilters/affiliationType'

import { Button, Tag } from 'components/basic'

interface IPropTypes {
  handleSelectedAffiliationType: (category: number) => void,
  selectedAffiliationType: number
}

const NO_AFFILIATION_TYPE = -1

const AffiliationTypesMobile = ({ handleSelectedAffiliationType, selectedAffiliationType }: IPropTypes) => {
  return (
    <>
      {
        affiliationType.map(type => {
          return (
            type.value !== NO_AFFILIATION_TYPE && (
              <Button
                className="_border-0 _p-0 _m-2"
                key={`affiliation-type${type.value}`}
                onClick={() => handleSelectedAffiliationType(type.value)}>
                <Tag
                  id={`affiliation-type-${type.value}`}
                  dismissible={false}
                  type={selectedAffiliationType === type.value ? 'blue' : ''}>
                  {type.text}
                </Tag>
              </Button>
            )
          )
        })
      }
    </>
  )
}

export default AffiliationTypesMobile
