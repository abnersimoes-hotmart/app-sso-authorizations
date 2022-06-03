import React from 'react'

import sanitizeHtml from 'sanitize-html'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Icon, Button } from 'components/basic'
import { RootState } from 'ducks/index'

import '../style.scss'

const AboutProduct = () => {
  const { t } = useTranslation()

  const { productDetails } = useSelector(({ product }: RootState) => product.details)

  const handleSalesPageClick = () => {
    window.open(productDetails.pageSalesLink, '_blank', 'noopener')
  }

  return (
    <div className="hot-row _my-7">
      <div className="hot-col-md-8 hot-col-sm-12 _text-break">
        <h3>{t('product_details.about_the_product')}</h3>
        <div
          className="text-wrapper"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(productDetails.description) }} />
      </div>
      <div className="hot-col-md-4 hot-col-sm-12">
        <div className="_p-4 _text-break _border _rounded _border-gray-200">
          <div className="_text-gray-500 _p-2">
            <h5>{t('general.characteristics')}</h5>
            <div className="_d-flex">
              <div className="hot-col-3 _text-gray-700 _mr-2 _p-0">
                {`${t('general.language')}: `}
              </div>
              <div>{t(`language.${productDetails.language}`)}</div>
            </div>
            <div className="_d-flex">
              <div className="hot-col-3 _text-gray-700 _mr-2 _p-0">
                {`${t('product_details.support_email')}: `}
              </div>
              <div>{productDetails.supportEmail}</div>
            </div>
          </div>
          <hr />
          <Button
            variation="primary"
            onClick={handleSalesPageClick}
            className="_mx-auto _w-full hot-row _d-flex _align-items-center _justify-content-center _text-break">
            <div className="_pl-0 _mr-3">{t('general.sales_page')}</div>
            <div className="_d-flex _align-items-center _p-0">
              <Icon type="regular" iconName="external-link-alt" className="_mr-2" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AboutProduct
