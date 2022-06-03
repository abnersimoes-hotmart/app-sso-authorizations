import React, { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ProductDetailInfoDesktop from './desktopProductDetails'
import ProductDetailInfoMobile from './mobileProductDetails'

import { isSmallScreen } from 'utils/constants'
import { getMoneyFormat } from 'utils/priceFormat'
import { sendInteractionEvent } from 'utils/gaEvent'
import { useVulcanoContext } from 'src/VulcanoContext'
import { Tag, Button } from 'components/basic'
import { RootState } from 'ducks/index'

import './style.scss'

interface IPropTypes {
  pullSessionId: string
}

const ProductDetailInfo = ({ pullSessionId }: IPropTypes) => {
  const { user } = useVulcanoContext()
  const language = user?.profile?.locale
  const { t } = useTranslation()

  const history = useHistory()
  const queryParams = new URLSearchParams(window.location.search)
  const bookmarked = queryParams.get('bookmarked') || false

  const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(bookmarked === 'true')

  const detailsInfo = useSelector(({ product }: RootState) => product)

  const { commission } = detailsInfo.details.affiliationDetails
  const { productDetails } = detailsInfo.details

  const generateAffiliationRuleTag = () => {
    const tags = detailsInfo.details.productDetails.tags
    let tagLabel = ''

    if (tags.affiliationRule === 'LAST_COOKIE_COUNTS') {
      tagLabel = t('product_details.tags.last_click')
    } else if (tags.affiliationRule === 'FIRST_COOKIE_COUNTS') {
      tagLabel = t('product_details.tags.first_click')
    } else {
      tagLabel = t('product_details.tags.multi_click')
    }

    return (
      <Tag
        key={`TAG_${tags.affiliationRule}`}
        id={`TAG_${tags.affiliationRule}`}
        type="blue"
        dismissible={false}
        className="_mr-3"
      >
        {tagLabel}
      </Tag>
    )
  }

  const generateAffiliationTypeTag = () => {
    const tags = detailsInfo.details.productDetails.tags
    let tagLabel = ''

    if (tags.affiliationType === 'ANYONE') {
      tagLabel = t('product_details.tags.affiliation_type_anyone')
    } else if (tags.affiliationType === 'APPLICATION') {
      tagLabel = t('product_details.tags.affiliation_type_application')
    } else {
      tagLabel = t('product_details.tags.affiliation_type_no_one')
    }

    return (
      <Tag
        key={`TAG_${tags.affiliationType}`}
        id={`TAG_${tags.affiliationType}`}
        type="blue"
        dismissible={false}
        className="_mr-3"
      >
        {tagLabel}
      </Tag>
    )
  }

  const generateTag = (name, label) => {
    return (
      <Tag key={`TAG_${name}`} id={`TAG_${name}`} type="blue" className="_mr-3">
        {t(label)}
      </Tag>
    )
  }

  const generateCookiesTags = (cookieDuration: number) => {
    const eternalCookie = -1

    if (cookieDuration === eternalCookie) {
      return (
        <Tag key={`TAG_${name}`} id={`TAG_${name}`} type="blue" className="_mr-3">
          {t('product_details.tags.eternal_cookie')}
        </Tag>
      )
    } else {
      return (
        <Tag key={`TAG_${name}`} id={`TAG_${name}`} type="blue" className="_mr-3">
          <Trans
            i18nKey={'product_details.tags.cookie_duration'}
            values={{
              days: cookieDuration
            }}
          />
        </Tag>
      )
    }
  }

  const handleClickBuyProduct = () => {
    const specialCampaign = detailsInfo.details.productDetails.blackNovember
    const checkoutLink = detailsInfo.details.productDetails.checkoutLink
    const params = checkoutLink.indexOf('?') < 0 ? '?' : '&'

    sendInteractionEvent({
      eventAction: 'Click:Product:Buy',
      eventLabel: productDetails.id.toString()
    })

    let completeCheckoutLink = `${checkoutLink}${params}lang=${language}&sck=HOTMART_PLATFORM`

    if (specialCampaign) {
      completeCheckoutLink = completeCheckoutLink.concat(`&offDiscount=${specialCampaign.coupon}`)
    }

    window.open(completeCheckoutLink, '_blank', 'noopener')
  }

  const handleOpenCommissionsModal = () => {
    setIsCommissionModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsCommissionModalOpen(false)
  }

  const handleToggleBookmarked = () => {
    setIsBookmarked(!isBookmarked)
    const params = new URLSearchParams(window.location.search)

    params.set('bookmarked', `${!isBookmarked}`)
    history.replace({ search: params.toString() })
  }

  const handleCommissionType = () => {
    if (productDetails.isSubscription) {
      return (
        <Button variation="tertiary" type="button" size="lg" onClick={handleOpenCommissionsModal}>
          <strong>{t('general.see_details')}</strong>
        </Button>
      )
    }

    return (
      <p className="_text-3 _mr-3 _mb-0">
        {productDetails.hasBlackNovemberCoupon
          ? `${commission.percentage}%`
          : getMoneyFormat(commission.price.value, commission.price.currency, language)}
      </p>
    )
  }

  const componentProps = {
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
  }

  return isSmallScreen ? (
    <ProductDetailInfoMobile componentProps={componentProps} />
  ) : (
    <ProductDetailInfoDesktop componentProps={componentProps} />
  )
}

export default ProductDetailInfo
