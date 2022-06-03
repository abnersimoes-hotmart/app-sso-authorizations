import React from 'react'
import { Trans } from 'react-i18next'

export const affiliationRule = [
  {
    value: -1,
    text: <Trans
      i18nKey={'filters.choose_an_option'}
    />
  }, {
    value: 0,
    text: <Trans
      i18nKey={'filters.labels.affiliation_rule.last_click'}
    />
  }, {
    value: 1,
    text: <Trans
      i18nKey={'filters.labels.affiliation_rule.first_click'}
    />
  }, {
    value: 2,
    text: <Trans
      i18nKey={'filters.labels.affiliation_rule.multi_click'}
    />
  }
]
