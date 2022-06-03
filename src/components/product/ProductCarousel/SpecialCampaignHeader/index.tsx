import React from 'react'

import { useTranslation } from 'react-i18next'

import { SpecialCampaignTypes } from 'utils/specialCampaign'
import { ISpecialCampaign } from 'utils/interfaces/specialCampaign'

import SpecialCampaignEasterLogo from 'src/assets/images/special-campaign/easter/logo-easter-campaign.svg'

import './style.scss'

const SpecialCampaignHeader = ({ type, labels }: ISpecialCampaign) => {
  const { t } = useTranslation()

  if (type === SpecialCampaignTypes.Easter) {
    return (
      <>
        <div className="_mb-5 _mb-md-0 _ml-lg-4">
          <img
            src={SpecialCampaignEasterLogo}
            alt={t(labels.logoAlt)}
            className="section-products--special-campaign-logo"
          />
        </div>
        <div className="section-products--special-campaign-description _mb-4 _mb-md-0 _px-md-8">
          <p className="_m-0">{t(labels.description)}</p>
        </div>
      </>
    )
  }

  return null
}

export default SpecialCampaignHeader
