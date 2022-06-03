import React from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getMoneyFormat } from 'utils/priceFormat'
import { handleImageError } from 'utils/productDefaultImage'
import { IProductDetailsComponentProps } from 'utils/interfaces/productDetailsComponentProps'
import { isExtraSmallScreen } from 'utils/constants'
import { reviewRatingFormat } from 'utils/reviewRatingFormat'
import { Button, Icon, Tag, Tooltip } from 'components/basic'
import { RootState } from 'ducks/index'

import ProductCommission from './ProductCommission'
import ProductAffiliate from './ProductAffiliate'
import Modal from 'components/basic/Modal'
import ModalBody from 'components/basic/Modal/Body'
import ModalHeader from 'components/basic/Modal/Header'
import { FavoriteButton } from 'components/favorite'

import './style.scss'

const ProductDetailInfoDesktop = ({ componentProps }: IProductDetailsComponentProps) => {
  const { t } = useTranslation()

  const detailsInfo = useSelector(({ product }: RootState) => product)

  const { productDetails } = detailsInfo.details

  const {
    generateAffiliationRuleTag,
    generateAffiliationTypeTag,
    generateCookiesTags,
    generateTag,
    handleClickBuyProduct,
    handleCloseModal,
    handleCommissionType,
    handleToggleBookmarked,
    isBookmarked,
    isCommissionModalOpen,
    language
  } = componentProps

  const price = getMoneyFormat(productDetails.price.value, productDetails.price.currency, language)
  const reviewRating = reviewRatingFormat(productDetails.reviewRating)

  return (
    <>
      <Modal isOpen={isCommissionModalOpen} onClose={handleCloseModal}>
        <ModalHeader className="commission-modal-header">
          <h4 className="_mb-0">{t('general.details')}</h4>
        </ModalHeader>
        <ModalBody className="hot-modal__dialog _w-full _py-0 modal-body-table">
          <ProductCommission commissions={productDetails.plans} />
        </ModalBody>
      </Modal>
      <div className="_w-full _mt-4 _mb-0 product-information">
        <div className="_d-flex product-card-details _m-0 _w-full">
          <div className="hot-col-sm-12 hot-col-md-4 product-card-header">
            <div className="product-image-background" style={{ backgroundImage: `url("${productDetails.image}")` }} />
            <img
              className="product-image"
              alt={productDetails.alt}
              src={productDetails.image}
              onError={handleImageError}
            />
          </div>
          <div className="hot-col-sm-12 hot-col-md-8 _bg-white _p-0">
            <div className="_position-relative _p-5">
              <FavoriteButton
                onClick={handleToggleBookmarked}
                bookmarked={isBookmarked}
                productInfo={{
                  affiliation: detailsInfo.details.affiliationDetails,
                  producer: { ...detailsInfo.details.userProfile },
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  product: { ...detailsInfo.details.productDetails, bookmarked: isBookmarked }
                }}
              />
              <h3>{productDetails.name}</h3>
              <div className="_d-md-flex _d-sm-block _align-items-center _my-4">
                <Tooltip className={isExtraSmallScreen ? 'hot-col-6 _p-0' : ''} content={t('general.rating')}>
                  <Tag id="product_rating" className="_mr-5 _py-1" type="yellow">
                    <Icon type="solid" iconName="star" className="_mr-2 _text-yellow" />
                    <strong>{reviewRating}</strong>
                  </Tag>
                </Tooltip>
                <Tooltip className={isExtraSmallScreen ? 'hot-col-6 _p-0' : ''} content={t('general.temperature')}>
                  <Tag id="product_temperature" className="_mr-5 _py-1" type="red">
                    <Icon type="solid" iconName="fire" className="_mr-2 _text-red" />
                    <strong>{`${productDetails.temperature.toFixed(0)}°`}</strong>
                  </Tag>
                </Tooltip>
                <Tooltip className={isExtraSmallScreen ? 'hot-col-6 _p-0' : ''} content={t('general.blueprint')}>
                  <Tag id="product_blueprint" className="_mr-5 _py-1" type="blue">
                    <Icon type="solid" iconName="file-chart-line" className="_mr-2 _text-blue" />
                    <strong>{`${productDetails.blueprint.toFixed(0)}%`}</strong>
                  </Tag>
                </Tooltip>
                <div>
                  <p className="gray-500 _mr-3 _my-0">ID {productDetails.id}</p>
                </div>
              </div>
              <div className="_d-flex price-and-commission">
                {productDetails.isSubscription ? (
                  <div className="hot-col-4 _text-break _mr-3 _py-3 price">
                    <h6 className="_m-3">{t('product_details.see_details')}</h6>
                  </div>
                ) : (
                  <div className="hot-col-4 _text-break _mr-3 _py-3 price">
                    <p>{`${t('general.max_price')}: `}</p>
                    <p className="_text-3 _mr-3 _mb-0">{price}</p>
                  </div>
                )}
                <div className="hot-col-7 _text-break _py-3 _align-items-end _p-0">
                  {!productDetails.isSubscription && (
                    <h5 className="_text-green">{`${t('product_details.commission_up_to')} `}</h5>
                  )}
                  {handleCommissionType()}
                </div>
              </div>
              <div className="_pl-0 _bg-white">
                <ProductAffiliate pullSessionId={componentProps.pullSessionId} />
              </div>
            </div>
          </div>
        </div>
        <div className="_p-4 _aling-items-center _mb-0">
          <div className="_d-flex _mb-3">
            {t('product_details.product_type')}:{' '}
            <div className="_text-gray-500 _ml-3">{t(`product_details.${productDetails.format}`)}</div>
          </div>
          <div className="_d-flex _align-items-center">
            {generateAffiliationRuleTag()}
            {productDetails.tags.hasAffiliationResource
              && generateTag('TAG_HAS_DIVULGATION_MATERIAL', 'product_details.divulgation_material.title')}
            {productDetails.tags.hasAlternativePage
              && generateTag('HAS_ALTERNATIVE_PAGE', 'product_details.tags.alternative_page')}
            {productDetails.tags.hasHotleads && generateTag('HOTLEADS', 'general.hotleads')}
            {generateCookiesTags(productDetails.tags.affiliationCookieDuration)}
            {generateAffiliationTypeTag()}
          </div>
        </div>
      </div>
      <div className="_d-flex _justify-content-center">
        <div className="hot-row _d-flex _align-items-center _text-gray-500 _justify-content-center _mt-0 _bg-gray-100 _p-2 _border-gray-200 buy-product">
          <div className="hot-col-md-6 hot-col-sm-12 _mr-md-3 _p-sm-0 _justify-content-end _d-flex">
            {t('product_details.buy_product')}
          </div>
          <div className="hot-col-md-5 hot-col-sm-12 _d-flex _justify-content-md-start _justify-content-center">
            <Button className="_bg-gray-100" onClick={handleClickBuyProduct}>
              {t('product_details.buy_now')}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailInfoDesktop
