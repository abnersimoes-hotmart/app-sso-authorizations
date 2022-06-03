import React from 'react'
import { Trans } from 'react-i18next'

export const commissionRange = [
  {
    value: 'DEFAULT',
    text: <Trans
      i18nKey={'filters.choose_an_option'}
    />
  }, {
    value: 'TO_20',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '0%',
        maxPrice: '20%'
      }}
    />
  }, {
    value: 'TO_40',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '20%',
        maxPrice: '40%'
      }}
    />
  }, {
    value: 'TO_60',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '40%',
        maxPrice: '60%'
      }}
    />
  }, {
    value: 'TO_80',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '60%',
        maxPrice: '80%'
      }}
    />
  }, {
    value: 'TO_100',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '80%',
        maxPrice: '100%'
      }}
    />
  }
]

