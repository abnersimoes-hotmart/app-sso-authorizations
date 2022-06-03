import React from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { IProductDetailsComponentProps } from 'utils/interfaces/productDetailsComponentProps'

import { getMoneyFormat } from 'utils/priceFormat'
import { handleImageError } from 'utils/productDefaultImage'
import { reviewRatingFormat } from 'utils/reviewRatingFormat'
import { Button, Card, Icon, Tag } from 'components/basic'

import ProductCommission from './ProductCommission'
import ProductAffiliate from './ProductAffiliate'
import Modal from 'components/basic/Modal'
import ModalBody from 'components/basic/Modal/Body'
import ModalHeader from 'components/basic/Modal/Header'
import { RootState } from 'ducks/index'
import { FavoriteButton } from 'components/favorite'

import './style.scss'

const ProductDetailInfoMobile = ({ componentProps }: IProductDetailsComponentProps) => {
  const { t } = useTranslation()
  const history = useHistory()
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
    language,
    pullSessionId
  } = componentProps

  const goBack = () => {
    history.goBack()
  }

  const reviewRating = reviewRatingFormat(productDetails.reviewRating)

  return (
    <>
      <Button
        className="go-back-button _my-3 _p-4 _d-flex _border-0 _justify-content-start _align-items-center _text-4 _text-gray-700"
        onClick={goBack}
      >
        <Icon className="_mr-3" type="regular" fontSize={2} iconName="arrow-left" />
        {t('general.go_back')}
      </Button>
      <Modal isOpen={isCommissionModalOpen} onClose={handleCloseModal}>
        <ModalHeader className="commission-modal-header">
          <h4 className="_mb-0">{t('general.details')}</h4>
        </ModalHeader>
        <ModalBody className="hot-modal__dialog _w-full _py-0 modal-body-table">
          <ProductCommission commissions={productDetails.plans} />
        </ModalBody>
      </Modal>
      <Card className="_rounded _w-full _mt-4 _mb-0 product-information">
        <Card.Header className="product-card-details _rounded-top _p-0">
          <div className="product-card-header hot-col-12 _rounded-top _p-0">
            <div className="product-image-background" style={{ backgroundImage: `url("${productDetails.image}")` }} />
            <img
              className="product-image _rounded-top "
              alt={productDetails.alt}
              src={productDetails.image}
              onError={handleImageError}
            />
          </div>
        </Card.Header>
        <Card.Body className="_p-0">
          <div className="_d-flex _bg-white _p-0 _m-0">
            <div className="hot-col-12 _position-relative _p-0">
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
              <div className="_p-3">
                <h3 className="_text-4 _pr-8">{productDetails.name}</h3>
                <div>
                  <p className="gray-500 _mr-3 _my-0">ID {productDetails.id}</p>
                </div>
              </div>
              <div className="_d-block _p-3 _align-items-center">
                <Tag id="product_rating" className="_mr-5 _py-1" type="yellow">
                  <Icon type="solid" iconName="star" className="_mr-2 _text-yellow" />
                  <strong>{reviewRating}</strong>
                </Tag>
                <Tag id="product_temperature" className="_mr-5 _py-1" type="red">
                  <Icon type="solid" iconName="fire" className="_mr-2 _text-red" />
                  <strong>{`${productDetails.temperature.toFixed(0)}°`}</strong>
                </Tag>
                <Tag id="product_blueprint" className="_mr-5 _py-1" type="blue">
                  <Icon type="solid" iconName="file-chart-line" className="_mr-2 _text-blue" />
                  <strong>{`${productDetails.blueprint.toFixed(0)}%`}</strong>
                </Tag>
              </div>
              {productDetails.isSubscription ? (
                <>
                  <h6 className="_m-3">{t('product_details.see_details')}</h6>
                  <div className="_text-green _ml-2">{handleCommissionType()}</div>
                </>
              ) : (
                <>
                  <div className="card-footer-mobile _d-flex _text-break _text-3 _p-3">
                    {`${t('general.max_price')}: `}
                    <div className="_ml-2">
                      <strong>
                        {getMoneyFormat(productDetails.price.value, productDetails.price.currency, language)}
                      </strong>
                    </div>
                  </div>
                  <div className="_d-flex _text-break _text-4 _p-3 _p-0">
                    <h5 className="_text-green">{`${t('product_details.commission_up_to')} `}</h5>
                    <div className="_text-green _ml-2">{handleCommissionType()}</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="card-footer-mobile hot-col-md-8 hot-col-sm-11 _p-3 _bg-white">
            <ProductAffiliate pullSessionId={pullSessionId || ''} />
          </div>
        </Card.Body>
      </Card>
      <Card className="_my-3 _border _rounded _p-0 _aling-items-center">
        <Card.Body>
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
        </Card.Body>
        <Card.Footer className="card-footer-mobile _d-block _bg-gray-100 _w-full _p-2">
          <div className="_d-flex _mb-2 _justify-content-center">{t('product_details.buy_product')}</div>
          <div className="_d-flex _justify-content-center">
            <Button className="_bg-gray-100" onClick={handleClickBuyProduct}>
              {t('product_details.buy_now')}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </>
  )
}

export default ProductDetailInfoMobile
