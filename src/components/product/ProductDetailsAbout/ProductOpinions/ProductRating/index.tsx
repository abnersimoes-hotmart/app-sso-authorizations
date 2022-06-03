import React from 'react'

import { useTranslation } from 'react-i18next'

import { IProductRatingQuery } from 'api/useFetchProductRatingQuery'
import { reviewRatingFormat } from 'utils/reviewRatingFormat'

import { Icon, ProgressBar } from 'components/basic'

import './style.scss'

interface IProductRatingProps {
  rating: IProductRatingQuery
}

const ProductRating = ({ rating }: IProductRatingProps) => {
  const { t } = useTranslation()

  return (
    <div className="_d-flex _mt-8">
      <div className="rating-average _mr-10 _d-flex _flex-md-column _text-center _align-items-center">
        <span className="rating-average__title _font-weight-light">
          {reviewRatingFormat(rating.average)}
        </span>
        <div className="_pl-4 _p-md-0">
          <Icon
            type="solid"
            iconName="star"
            className="_text-yellow-light"
          />
          <span className="_text-gray-500 _text-lowercase _pl-2">
            {rating.total}{' '}
            {t(rating.total === 1 ? 'client_rating.rating' : 'client_rating.ratings')}
          </span>
        </div>
      </div>
      <div className="_d-none _d-md-flex _flex-md-column">
        {rating.ratings.map(item => {
          const label = item.index === 1 ? 'client_rating.star' : 'client_rating.stars'

          return (
            <div key={item.index} className="rating-progress__item _d-flex _align-items-center _justify-content-between">
              <span className="_text-2">{item.index} {t(label)}</span>
              <div className="rating-progress__bar">
                <ProgressBar value={`${item.percentage}`} size="sm" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductRating
