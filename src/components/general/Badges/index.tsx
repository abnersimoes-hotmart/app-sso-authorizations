import React from 'react'

import { useTranslation } from 'react-i18next'
import badgeBasicInfoComplete from 'src/assets/images/badges/cadastroCompleto.svg'
import badgePioneerism from 'src/assets/images/badges/pioneiros.svg'
import badgeSales1 from 'src/assets/images/badges/1venda.svg'
import badgeSales2 from 'src/assets/images/badges/2venda.svg'
import badgeSales3 from 'src/assets/images/badges/3venda.svg'
import badgeNetworker from 'src/assets/images/badges/networker.svg'
import badgeLeader from 'src/assets/images/badges/lider.svg'
import badgeCommision1 from 'src/assets/images/badges/1comissao.svg'
import badgeCommision2 from 'src/assets/images/badges/2comissao.svg'
import badgeCommision3 from 'src/assets/images/badges/3comissao.svg'
import badgeRio40 from 'src/assets/images/badges/rio40.svg'
import badgeArataday from 'src/assets/images/badges/arataday.svg'
import badgeSaara from 'src/assets/images/badges/saara.svg'
import badge60c from 'src/assets/images/badges/60c.svg'
import badge70c from 'src/assets/images/badges/70c.svg'
import badge80c from 'src/assets/images/badges/80c.svg'
import badge90c from 'src/assets/images/badges/90c.svg'
import badge100c from 'src/assets/images/badges/100c.svg'
import badgePartnershipProgram from 'src/assets/images/badges/partnershipProgram.svg'

const allBadges = [
  { badgeId: 7, badgeImage: badgeBasicInfoComplete },
  { badgeId: 8, badgeImage: badgePioneerism },
  { badgeId: 9, badgeImage: badgeSales1 },
  { badgeId: 10, badgeImage: badgeSales2 },
  { badgeId: 11, badgeImage: badgeSales3 },
  { badgeId: 12, badgeImage: badgeNetworker },
  { badgeId: 13, badgeImage: badgeLeader },
  { badgeId: 14, badgeImage: badgeCommision1 },
  { badgeId: 15, badgeImage: badgeCommision2 },
  { badgeId: 16, badgeImage: badgeCommision3 },
  { badgeId: 18, badgeImage: badgeRio40 },
  { badgeId: 19, badgeImage: badgeArataday },
  { badgeId: 20, badgeImage: badgeSaara },
  { badgeId: 21, badgeImage: badge60c },
  { badgeId: 22, badgeImage: badge70c },
  { badgeId: 23, badgeImage: badge80c },
  { badgeId: 24, badgeImage: badge90c },
  { badgeId: 25, badgeImage: badge100c },
  { badgeId: 109, badgeImage: badgePartnershipProgram }
]

interface IBadge {
  name: string,
  id: number
}

interface IPropTypes {
  badges: Array<IBadge>
}

const Badges = ({ badges = [] }: IPropTypes) => {
  const { t } = useTranslation()
  const getBadgeImage = selectedBadgeId => {
    const selectedBadge = allBadges.find(badge => badge.badgeId === selectedBadgeId)

    return selectedBadge?.badgeImage
  }

  const renderSelectedBadges = () => {
    if (badges && badges.length > 0) {
      return badges.map(badge => {
        return (
          <div className="hot-col-2" key={`badge-${badge.id}`} id={`badge-${badge.id}`}>
            <img src={getBadgeImage(badge.id)} alt={t(`badges.${badge.name}`)} />
          </div>
        )
      })
    }
    return <p>{t('product_details.no_badges')}</p>
  }

  return (
    <div className="hot-row">
      {renderSelectedBadges()}
    </div>
  )
}

export default Badges
