import React from 'react'
import { Trans } from 'react-i18next'

export const priceRange = [
  {
    value: 'RANGE_0',
    text: <Trans
      i18nKey={'filters.choose_an_option'}
    />
  }, {
    value: 'RANGE_1',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '0',
        maxPrice: '100'
      }}
    />
  }, {
    value: 'RANGE_2',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '100',
        maxPrice: '300'
      }}
    />
  }, {
    value: 'RANGE_3',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '300',
        maxPrice: '500'
      }}
    />
  }, {
    value: 'RANGE_4',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '500',
        maxPrice: '1000'
      }}
    />
  }, {
    value: 'RANGE_5',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '1000',
        maxPrice: '1500'
      }}
    />
  }, {
    value: 'RANGE_6',
    text: <Trans
      i18nKey={'general.price_range'}
      values={{
        minPrice: '1500',
        maxPrice: '3000'
      }}
    />
  }, {
    value: 'RANGE_7',
    text: <Trans
      i18nKey={'general.over_price_range'}
      values={{
        minPrice: '3000'
      }}
    />
  }
]

