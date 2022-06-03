import React from 'react'
import { Trans } from 'react-i18next'

import { ISpecialCampaign } from 'utils/interfaces/specialCampaign'

export const orderOptions = (isSpecialCampaignActive: boolean, currentSpecialCampaign: ISpecialCampaign | null) => {
  const orderByOptions = [
    {
      value: '',
      text: <Trans
        i18nKey={'filters.choose_an_option'}
      />
    }, {
      value: 'hottest',
      text: <Trans
        i18nKey={'hottest.title'}
      />
    }, {
      value: 'dearest',
      text: <Trans
        i18nKey={'dearests.title'}
      />
    }, {
      value: 'newest',
      text: <Trans
        i18nKey={'newest.title'}
      />
    }
  ]

  if (isSpecialCampaignActive) {
    orderByOptions.push(
      {
        value: 'specialCampaignHottest',
        text: <Trans
          i18nKey={currentSpecialCampaign?.labels.orderByHottest}
        />
      }, {
        value: 'specialCampaignDearest',
        text: <Trans
          i18nKey={currentSpecialCampaign?.labels.orderByDearest}
        />
      }
    )
  }
  return orderByOptions
}
