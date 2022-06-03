import React from 'react'

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { sendInteractionEvent } from 'utils/gaEvent'
import { IProductInformation } from 'utils/interfaces/productInformation'

import { Card, Icon, Tooltip } from 'components/basic'
import { FavoriteButton } from 'components/favorite'

import { sendRecommendationPullSessionIdDetails } from 'services/market'
import { useVulcanoContext } from 'src/VulcanoContext'
import { getMoneyFormat } from 'utils/priceFormat'
import { handleImageError } from 'utils/productDefaultImage'
import { RouteNames, isExtraSmallScreen } from 'utils/constants'
import { getCurrentSpecialCampaignByDateAndLocale } from 'utils/specialCampaign'
import { reviewRatingFormat } from 'utils/reviewRatingFormat'

import SpecialCampaignTags from './SpecialCampaignTags'

import './style.scss'

interface IPropTypes {
  productInformation: IProductInformation
  favoritePage?: number
  isResultPage?: boolean
  isSpecialCampaign?: boolean
  isCarousel?: boolean
  area?: string
}

const ProductCard = ({
  favoritePage,
  productInformation,
  isCarousel = false,
  isSpecialCampaign = false,
  isResultPage = false,
  area = ''
}: IPropTypes) => {
  const { t } = useTranslation()

  const { alt, name, image, reviewRating, temperature, totalAnswers, price, isSubscription, bookmarked }
    = productInformation.product

  const { affiliation } = productInformation

  const {
    user: { profile: { locale } = {} }
  } = useVulcanoContext()

  const currentSpecialCampaign = getCurrentSpecialCampaignByDateAndLocale(locale)
  const showPercentageCommission = isSpecialCampaign && currentSpecialCampaign?.name.includes('Black November')

  const productDetailsLink = `.${RouteNames.PRODUCT_DETAILS}?producerUcode=${
    productInformation.producer.ucode
  }&productUcode=${productInformation.product.ucode}${
    isSpecialCampaign ? `&specialCampaign=${currentSpecialCampaign?.type}` : ''
  }${
    productInformation.pullSessionId ? `&pullSessionId=${productInformation.pullSessionId}` : ''
  }&bookmarked=${bookmarked}`

  const productReviewRating = reviewRatingFormat(reviewRating)

  const handleClickProductCard = () => {
    sendInteractionEvent({
      nonInteraction: true,
      eventAction: 'Show:Product',
      eventLabel: productInformation.product.id.toString()
    })

    if (area) {
      sendInteractionEvent({
        eventAction: `Click:Card:${area}`,
        eventLabel: productInformation.product.id.toString()
      })
    }

    if (productInformation.pullSessionId) {
      const params = {
        productUcode: productInformation.product.ucode,
        recommendationPullSessionId: productInformation.pullSessionId
      }

      sendRecommendationPullSessionIdDetails(params)
    }

    return productDetailsLink
  }

  const addSpecialCampaingTag = () => {
    if (!isCarousel && isSpecialCampaign && currentSpecialCampaign) {
      return <SpecialCampaignTags {...currentSpecialCampaign} />
    }

    return ''
  }

  const cardClasses = () => {
    return `product-card card-container _border-0 _rounded-lg ${isResultPage ? '_w-full _mb-3' : ''}`
  }

  const renderPrices = () => {
    if (isSubscription) {
      return (
        <div className="_pt-2 _px-4">
          <div className="_d-flex _flex-column _pb-1">
            <p className="_mb-0 _text-1 _text-gray-800">{t('product_details.commission_up_to')}</p>
            <p
              className={`_mb-0 _text-3 _text-md-4 _text-green _font-weight-light _text-lowercase _text-decoration-underline`}
            >
              {t('general.see_details')}
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="_pt-2 _px-4">
        <div className="_d-flex _flex-column _pb-1">
          <p className="_mb-0 _text-1 _text-gray-800">{t('product_details.commission_up_to')}</p>
          <p className="_mb-0 _text-3 _text-md-4 _text-green _font-weight-light">
            {showPercentageCommission
              ? `${affiliation.commission.percentage}%`
              : getMoneyFormat(affiliation.commission.price.value, affiliation.commission.price.currency, locale)}
          </p>
        </div>
        <div className="_d-none _d-md-flex">
          <p className="_mb-0 _text-1 _text-gray-500">
            {t('general.max_product_price')} {getMoneyFormat(price.value, price.currency, locale)}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Link
      data-test-id="product-card-link"
      className="product-detail-link"
      onClick={handleClickProductCard}
      to={productDetailsLink}
    >
      <Card className={cardClasses()}>
        <Card.Header className="product-card-header _p-0 _border-0 _rounded-0 _position-relative">
          <div
            className="product-image-background _position-relative"
            style={{ backgroundImage: image && `url("${image}")` }}
          />
          <div className="product-image _position-absolute _d-flex _w-full _align-items-center _justify-content-center">
            <img className="_h-full" alt={alt} src={image} onError={handleImageError} />
          </div>
        </Card.Header>
        <Card.Body
          className={`product-card-body _position-relative _p-0 ${
            isSpecialCampaign && !isCarousel && 'product-card-body__special-campaign'
          }`}
        >
          {addSpecialCampaingTag()}
          <FavoriteButton page={favoritePage} bookmarked={bookmarked} productInfo={productInformation} />
          <div className="_pt-4 _px-4">
            <div className="_mb-3 _d-flex _font-weight-bold _align-items-start">
              <Tooltip className={isExtraSmallScreen ? 'hot-col-6 _p-0' : ''} content={t('general.rating')}>
                <div className="_mr-2 _d-flex _align-items-center">
                  <span className="_mr-1 _text-1 _text-gray-800">{productReviewRating}</span>
                  <Icon type="solid" iconName="star" width={12} height={12} className="_text-yellow" />
                  <span className="_ml-1 _text-1 _text-gray-500 _font-weight _d-none _d-md-inline">
                    ({totalAnswers})
                  </span>
                </div>
              </Tooltip>
              <Tooltip className={isExtraSmallScreen ? 'hot-col-6 _p-0' : ''} content={t('general.temperature')}>
                <div className="_d-flex _align-items-center">
                  <span className="_mr-1 _text-1 _text-gray-800">{`${temperature.toFixed(0)}°`}</span>
                  <Icon type="solid" iconName="fire" width={12} height={12} className="_text-red" />
                </div>
              </Tooltip>
            </div>
            <span className="product-name _text-md-2 _text-gray-800">
              <strong>{name}</strong>
            </span>
          </div>
          {renderPrices()}
        </Card.Body>
      </Card>
    </Link>
  )
}

export default ProductCard
