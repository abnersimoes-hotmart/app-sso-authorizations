import React, { ReactNode, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ProductsCardsPerCarousel, isMediumOrLowerScreen, isLargeOrLowerScreen } from 'utils/constants'
import { IProductInformation } from 'utils/interfaces/productInformation'
import { ISpecialCampaign } from 'utils/interfaces/specialCampaign'
import { Icon, Loader } from 'components/basic'
import { Carousel, NoProduct } from 'components/general'
import { ProductCard } from 'components/product'

import SpecialCampaignHeader from './SpecialCampaignHeader'

import SpecialCampaignEasterBG from 'src/assets/images/special-campaign/easter/bg-easter-campaign.svg'
import SpecialCampaignEasterBGTop from 'src/assets/images/special-campaign/easter/bg-top-easter-campaign.svg'

import './style.scss'

interface IPropTypes {
  title: string | ReactNode,
  id: string,
  className?: string,
  subtitle: string | ReactNode,
  seeMorePath?: string,
  seeMoreLink?: string,
  seeMoreLinkAction?: () => void,
  products: Array<IProductInformation>,
  isSpecialCampaign?: boolean,
  currentSpecialCampaign?: ISpecialCampaign | null,
  isLoading?: boolean
}

const ProductCarousel = ({
  title,
  id,
  subtitle,
  seeMorePath,
  seeMoreLink,
  seeMoreLinkAction = () => null,
  products,
  className = '',
  isSpecialCampaign = false,
  currentSpecialCampaign,
  isLoading = false }: IPropTypes) => {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(1)

  const productsLength = products.length
  const showSeeMoreButton = productsLength >= ProductsCardsPerCarousel && seeMoreLink
  const totalPage = Math.ceil(productsLength / (isLargeOrLowerScreen ? 3 : 4))
  const currentPage = Math.ceil((currentSlide) / (isLargeOrLowerScreen ? 3 : 4))

  const handleAfterChange = (index: number) => {
    setCurrentSlide(index + 1)
  }

  const renderSeeMoreButton = () => {
    if (isSpecialCampaign && seeMorePath) {
      return (
        <Link
          className="hot-button _mb-7 _mb-md-0 _border-0 _text-2 _d-flex _align-items-center _justify-content-center"
          onClick={seeMoreLinkAction}
          to={seeMorePath}>
          {t('general.check_the_products')}
          <Icon
            type="light"
            iconName="arrow-right"
            className="_ml-4"
            width={12}
          />
        </Link>
      )
    }

    if (showSeeMoreButton && seeMorePath) {
      return (
        <Link
          className="_border-0 _text-2 _text-lowercase"
          onClick={seeMoreLinkAction}
          to={seeMorePath}>
          {seeMoreLink}
          <Icon
            type="regular"
            iconName="chevron-right"
            className="_ml-2"
            height={16}
          />
        </Link>
      )
    }

    return null
  }

  const renderHeaderCarousel = () => {
    if (isSpecialCampaign && currentSpecialCampaign) {
      return (
        <div className="_mb-md-3 _d-flex _flex-column _align-items-start _flex-md-row _align-items-md-center _justify-content-md-between">
          <SpecialCampaignHeader {...currentSpecialCampaign} />
          {
            renderSeeMoreButton()
          }
        </div>
      )
    }

    return (
      <div className="_d-flex _mb-md-3">
        <div className="hot-row _align-items-end">
          <div className="hot-col-md-8 _d-flex _flex-column">
            {
              isMediumOrLowerScreen ? (
                <h6 className="section-title _mb-2 _text-gray-700">{title}</h6>
              ) : (
                <h3 className="section-title _mb-2 _text-gray-700">{title}</h3>
              )
            }
            <p className="_mb-0 _p-0 _text-2 _text-gray-500">{subtitle}</p>
          </div>
          <div className="hot-col-md-4 _d-none _d-md-flex _align-items-center _justify-content-end">
            {
              renderSeeMoreButton()
            }
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentPage = () => {
    return (
      <div className="carousel-current-page _position-absolute _d-none _d-md-flex">
        <span className="_text-gray-800">{currentPage} / {totalPage}</span>
      </div>
    )
  }

  const renderCarouselComponent = () => {
    if (isLoading) {
      return <Loader />
    } else if (productsLength > 0) {
      return (
        <div className={`carousel-container _position-relative _mb-md-7`}>
          <Carousel
            key={id}
            id={id}
            title={title}
            infinite={!isMediumOrLowerScreen}
            showArrows={!isMediumOrLowerScreen}
            qtdPerRow={productsLength >= 4 ? 4 : productsLength}
            qtdPerRowMd={productsLength >= 3 ? 3 : productsLength}
            qtdPerRowSm={productsLength >= 2 ? 2 : productsLength}
            qtdPerRowXs={1.5}
            afterChange={handleAfterChange}>
            {
              products.map(productInformation => (
                <div key={`product-${productInformation.product.id}`} className="_px-3">
                  <ProductCard
                    area={id}
                    key={productInformation.product.id}
                    productInformation={productInformation}
                    isSpecialCampaign={isSpecialCampaign}
                    isCarousel
                  />
                </div>
              ))
            }
          </Carousel>
          {renderCurrentPage()}
        </div>
      )
    }
    return <NoProduct />
  }

  return (
    <div
      className={`_mb-9 ${className} ${
        isSpecialCampaign
          ? `section-products--special-campaign section-products--special-campaign-${currentSpecialCampaign?.type} _rounded-md-lg _p-5 _mt-6`
          : ''
      }`}
      style={{
        backgroundImage: isSpecialCampaign
          ? `url(${SpecialCampaignEasterBGTop}), url(${SpecialCampaignEasterBG})`
          : 'none',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundPosition: 'calc(100% - -70px) -70px, -40px -20px'
      }}
    >
      {
        renderHeaderCarousel()
      }
      {
        renderCarouselComponent()
      }
      <div className={`${isSpecialCampaign ? '_d-none' : '_d-md-none'}`}>
        {
          renderSeeMoreButton()
        }
      </div>
    </div>
  )
}

export default ProductCarousel
