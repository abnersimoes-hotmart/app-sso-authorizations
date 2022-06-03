import React from 'react'

import { Link } from 'react-router-dom'

import { Card, Icon } from 'components/basic'

import './style.scss'

const ICON_SIZE = 40

interface ISeeMoreCard {
  seeMoreLink?: string,
  seeMorePath: string,
  seeMoreLinkAction?: () => void
}

const SeeMoreProductCard = ({ seeMoreLink, seeMoreLinkAction, seeMorePath }: ISeeMoreCard) => {
  return (
    <Link
      className="see-more-link"
      onClick={seeMoreLinkAction}
      to={seeMorePath}>
      <Card className="product-card _border-gray-200 _d-flex _justify-content-center _align-items-center">
        <div className=" _d-flex _align-items-center _flex-column pt-4 _justify-content-center _text-blue _text-5">
          <div className="_bg-primary-lightest _rounded-circle _d-flex _p-5 _align-items-center _justify-content-center">
            <Icon
              type="regular"
              iconName="arrow-right"
              width={ICON_SIZE}
              height={ICON_SIZE} />
          </div>
          <div className="_mt-3">
            {seeMoreLink}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default SeeMoreProductCard
