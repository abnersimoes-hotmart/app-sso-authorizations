import React from 'react'
import { Trans } from 'react-i18next'

export const affiliationType = [
  {
    value: -1,
    text: <Trans
      i18nKey={'filters.choose_an_option'}
    />
  }, {
    value: 0,
    text: <Trans
      i18nKey={'filters.labels.affiliation_type.one_click'}
    />
  }, {
    value: 1,
    text: <Trans
      i18nKey={'filters.labels.affiliation_type.approval_affiliation'}
    />
  }
]
