import React from 'react'
import { useTranslation } from 'react-i18next'

import SpecialCampaignEasterLogo from 'src/assets/images/special-campaign/easter/logo-easter-campaign.svg'
import SpecialCampaignEasterBG from 'src/assets/images/special-campaign/easter/bg-easter-campaign.svg'

import { SpecialCampaignTypes } from 'utils/specialCampaign'
import { ISpecialCampaign } from 'utils/interfaces/specialCampaign'

import './style.scss'

const SpecialCampaignTags = ({ type, labels }: ISpecialCampaign) => {
  const { t } = useTranslation()

  if (type === SpecialCampaignTypes.Easter) {
    return (
      <div
        className={`special-campaign special-campaign-${type} _position-relative _d-flex _w-full _align-items-center _justify-content-center`}
        style={{ backgroundImage: `url(${SpecialCampaignEasterBG})` }}
      >
        <img
          className="special-campaign__logo"
          alt={t(labels.logoAlt)}
          src={SpecialCampaignEasterLogo}
        />
      </div>
    )
  }

  return null
}

export default SpecialCampaignTags
