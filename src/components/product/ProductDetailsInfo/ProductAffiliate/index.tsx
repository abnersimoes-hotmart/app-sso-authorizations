import React, { useCallback, useState, useEffect } from 'react'

import { useVulcanoContext } from 'src/VulcanoContext'
import { useTranslation, Trans } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { sendInteractionEvent, sendPageViewEvent } from 'utils/gaEvent'

import Modal from 'components/basic/Modal'
import ModalBody from 'components/basic/Modal/Body'
import ModalHeader from 'components/basic/Modal/Header'
import ModalFooter from 'components/basic/Modal/Footer'
import { Button, Form, Loader } from 'components/basic'

import useSuccessMessage from 'custom-hooks/useSuccessMessage'
import { showErrorAlert } from 'utils/toast'

import ProductAffiliateConfirmationModal from './ProductAffiliateConfirmationModal'

import { getButtonType } from './buttonType'
import { userBlocks } from 'services/accountControl'
import { setProductDetails } from 'ducks/product'
import { RootState } from 'ducks/index'
import {
  requestAffiliation,
  getRequireMessageToProducer,
  getProductDetails,
  sendRecommendationPullSessionIdDetails
} from 'services/market'
import { AffiliationType, isSmallScreen, UserBlockledByBK } from 'utils/constants'

interface IPropTypes {
  pullSessionId: string
}

const ProductAffiliate = ({ pullSessionId }: IPropTypes) => {
  const { t } = useTranslation()
  const handleSuccessMessage = useSuccessMessage(t)

  const dispatch = useDispatch()

  const { user } = useVulcanoContext()
  const { details } = useSelector(({ product }: RootState) => product)
  const { affiliationDetails, productDetails, userProfile } = details

  const [showTOS, setShowTOS] = useState(false)
  const [acceptedTOS, setAcceptedTOS] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [requireMessageToProducer, setRequireMessageToProducer] = useState(false)
  const [hasAffiliationBlock, setHasAffiliationBlock] = useState(false)
  const [isLoadingButtonType, setIsLoadingButtonType] = useState(true)

  const getIsMessageRequired = useCallback(async () => {
    const params = {
      productId: productDetails.id
    }

    const { allowRequestMessage } = await getRequireMessageToProducer(params)

    setRequireMessageToProducer(allowRequestMessage || false)
  }, [productDetails.id])

  const getUserBlocks = async () => {
    const response = await userBlocks()

    setHasAffiliationBlock(response.blocks.some(item => item.blockType === UserBlockledByBK))
    setIsLoadingButtonType(false)
  }

  useEffect(() => {
    getIsMessageRequired()
    getUserBlocks()
  }, [getIsMessageRequired])

  const handleOpenTOS = useCallback(() => {
    const cluster = sessionStorage.getItem('cluster')
    const pageView = {
      subsection2: 'Before Affiliating',
      logged: Boolean(user.profile.id),
      language: user.profile.locale,
      productID: productDetails.id,
      productName: productDetails.name,
      producerName: userProfile.name,
      ...(cluster && cluster !== 'undefined' && { cluster })
    }

    sendPageViewEvent(pageView)
    const pullSessionParams = {
      productUcode: productDetails.ucode,
      recommendationPullSessionId: pullSessionId || null
    }

    sendRecommendationPullSessionIdDetails(pullSessionParams)

    sendInteractionEvent({
      nonInteraction: false,
      eventAction: 'Click:Product:AffiliateNow',
      eventLabel: productDetails.id.toString()
    })

    sendInteractionEvent({
      nonInteraction: true,
      eventAction: 'Show:BeforeAffilitation',
      eventLabel: productDetails.id.toString()
    })

    setShowTOS(true)
  }, [productDetails.id,
    productDetails.name,
    productDetails.ucode,
    pullSessionId,
    user.profile.id,
    user.profile.locale,
    userProfile.name])

  const handleCloseTOS = () => {
    sendInteractionEvent({
      eventAction: 'Click:BeforeAffilitation:Cancel',
      eventLabel: productDetails.id.toString()
    })

    setShowTOS(false)
  }

  const handleCloseMessageToProducer = () => {
    setShowMessageModal(false)
  }

  const handleAffiliationRequest = useCallback(async () => {
    const params = {
      productId: productDetails.id,
      ...(pullSessionId && { recommendationPullSessionId: pullSessionId })
    }

    const updateDetailsparams = {
      productUcode: productDetails.ucode
    }

    sendInteractionEvent({
      nonInteraction: true,
      eventAction: 'Show:BeforeAffilitation',
      eventLabel: productDetails.id.toString()
    })

    try {
      await requestAffiliation(params)

      setAcceptedTOS(true)
      setShowTOS(false)

      const response = await getProductDetails(updateDetailsparams)

      dispatch(setProductDetails(response))

      getButtonType(user, affiliationDetails, productDetails, handleOpenTOS, hasAffiliationBlock)

      handleSuccessMessage()
    } catch {
      setShowTOS(false),
      setAcceptedTOS(false)

      showErrorAlert(t('general.operation_fail'))
      getButtonType(user, affiliationDetails, productDetails, handleOpenTOS, hasAffiliationBlock)
    }
  }, [affiliationDetails,
    dispatch, handleOpenTOS,
    handleSuccessMessage,
    hasAffiliationBlock,
    productDetails,
    pullSessionId,
    t,
    user])

  const handleAffiliationRequestWithMessage = useCallback(async () => {
    const params = {
      productId: productDetails.id,
      requestMessage: inputMessage
    }
    const updateDetailsparams = {
      productUcode: productDetails.ucode
    }

    try {
      await requestAffiliation(params)
      const response = await getProductDetails(updateDetailsparams)

      dispatch(setProductDetails(response))
      handleSuccessMessage()
    } catch {
      setAcceptedTOS(false)
      handleSuccessMessage()
    } finally {
      setShowMessageModal(false)
      setShowTOS(false)
    }
  }, [dispatch, handleSuccessMessage, inputMessage, productDetails.id, productDetails.ucode])

  const affiliateButtonTitle = (title, color, hasButton) => {
    if (isSmallScreen) {
      return ''
    }

    return (
      <h6 className={`_text-${color} _text-break ${hasButton ? '_m-1' : ' _mb-0'}`}>
        {t(title)}
      </h6>
    )
  }

  const renderComponents = () => {
    const buttonProperties = getButtonType(user, affiliationDetails, productDetails, handleOpenTOS, hasAffiliationBlock)
    const { hasButton, buttonVariation, clickAction } = buttonProperties

    let { button, color, title } = buttonProperties

    if (!showTOS && acceptedTOS) {
      if (affiliationDetails && affiliationDetails.type === AffiliationType.oneClick) {
        title = 'product_details.affiliate.already_affiliated'
        button = 'product_details.affiliate.see_links'
        color = 'green'
        return (
          <>
            {
              affiliateButtonTitle(title, color, hasButton)
            }
            {
              hasButton && (
                <Button
                  type="button"
                  variation={buttonVariation}
                  onClick={clickAction}
                  className="hot-col">
                  <p className="_text-break _m-0">{t(button)}</p>
                </Button>
              )
            }
          </>
        )
      }
      return (
        <div className={`${isSmallScreen && '_d-none'}`}>
          <h4 className="_text-blue _text-break _mb-0">
            {t('product_details.affiliate.request_sent')}
          </h4>
        </div>
      )
    } else {
      return (
        <>
          {
            affiliateButtonTitle(title, color, hasButton)
          }
          {
            hasButton && (
              <Button
                type="button"
                variation={buttonVariation}
                onClick={clickAction}
                className="hot-col">
                <p className="_text-break _m-0">{t(button)}</p>
              </Button>
            )
          }
        </>
      )
    }
  }

  const handleRequestButton = () => {
    sendInteractionEvent({
      eventAction: 'Click:BeforeAffilitation:Affiliate',
      eventLabel: productDetails.id.toString()
    })

    if (requireMessageToProducer) {
      setShowMessageModal(true)
    } else {
      handleAffiliationRequest()
    }
  }

  const handleStrategyMessage = e => {
    setInputMessage(e.target.value)
  }

  return (
    <>
      {
        isLoadingButtonType
          ? <Loader />
          : renderComponents()
      }

      <ProductAffiliateConfirmationModal
        isOpen={showTOS}
        onClose={handleCloseTOS}
        onClick={handleRequestButton}
        isSubscription={productDetails.isSubscription} />

      <Modal
        isOpen={showMessageModal}
        onClose={handleCloseMessageToProducer}>
        <ModalHeader>
          <Trans
            i18nKey={'product_details.affiliate.request_message_modal.title'}
          />
        </ModalHeader>
        <ModalBody>
          <p>
            <Trans
              i18nKey={'product_details.affiliate.request_message_modal.description'}
            />
          </p>
          <Form.InputTextArea
            handleChange={e => handleStrategyMessage(e)}
            placeholder={t('product_details.affiliate.request_message_modal.placeholder')}
            rows={10} />
        </ModalBody>
        <ModalFooter>
          <div className="_d-flex _w-full _justify-content-end">
            <Button
              className="_mr-3"
              onClick={handleCloseMessageToProducer}>
              {t('general.cancel')}
            </Button>
            <Button
              onClick={handleAffiliationRequestWithMessage}>
              {t('product_details.affiliate.request_affiliation')}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ProductAffiliate
