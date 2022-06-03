import React, { useCallback, useEffect, useState } from 'react'

import { useTranslation, Trans } from 'react-i18next'
import { useSelector } from 'react-redux'

import { useVulcanoContext } from 'src/VulcanoContext'
import formatUserLocale from 'utils/userLocaleFormat'
import { AffiliationStatus } from 'utils/constants'
import { getProductAffiliationInfo } from 'services/market'
import { Alert, Button, Icon, Loader, Modal, Table, Tag } from 'components/basic'
import { InputCheckbox } from 'components/basic/Form'

import { achievementsLabels, termsLinks } from './helpers'
import { RootState } from 'ducks/index'

import './style.scss'

const SHOW_TOTAL_BADGES = 4

interface ProductAffiliateConfirmationModal {
  onClose: () => void,
  onClick: () => void,
  isOpen: boolean,
  isSubscription: boolean
}

interface AffiliationInfo {
  approvalRule?: {
    badges?: Array<{
      name: string,
      id: number
    }>,
    affiliationPersonType: 'INDIVIDUAL_ENTITY' | 'LEGAL_ENTITY',
    hasAutomaticCancellation: boolean,
    hasENote: boolean
  },
  affiliationCookieDuration: number,
  affiliationRule: {
    rule: 'FIRST_COOKIE_COUNTS' | 'LAST_COOKIE_COUNTS' | 'MULTIPLE_COOKIE_COUNTS',
    multipleCookieCommission?: {
      first: number,
      last: number
    }
  },
  affiliationType: 'ANYONE' | 'APPLICATION' | 'NO_ONE'
  commission: number,
  hasBonusAffiliation: boolean,
  hasGlobalAffiliation: boolean,
  hasHotleads: boolean,
  personType: 'LEGAL_PERSON' | 'BOTH',
  supportEmail: string | null
}

const ProductAffiliateConfirmationModal = (props: ProductAffiliateConfirmationModal) => {
  const { t } = useTranslation()

  const { isOpen, onClose, onClick, isSubscription } = props

  const { user } = useVulcanoContext()
  const [isLoadingAffiliationInfo, setIsLoadingAffiliationInfo] = useState(true)
  const [errorGetData, setErrorGetData] = useState(false)
  const [showMoreAchievements, setShowMoreAchievements] = useState(false)
  const [productAffiliationInfo, setProductAffiliationInfo] = useState<AffiliationInfo>({} as AffiliationInfo)
  const [isAgreeTermsChecked, setIsAgreeTermsChecked] = useState(false)

  const { details } = useSelector(({ product }: RootState) => product)
  const { productDetails } = details

  const queryParams = new URLSearchParams(window.location.search)
  const productUcode = queryParams.get('productUcode') || productDetails.ucode

  const userLocale = formatUserLocale(user.profile.locale)
  const getTermsLinkByLocale = termsLinks[userLocale]

  const handleChangeAgreeTerms = () => {
    setIsAgreeTermsChecked(!isAgreeTermsChecked)
  }

  const fetchProductAffiliationInfo = useCallback(async () => {
    try {
      const params = {
        productUcode
      }
      const response = await getProductAffiliationInfo(params)

      setProductAffiliationInfo(response)
    } catch (e) {
      setErrorGetData(true)
    } finally {
      setIsLoadingAffiliationInfo(false)
    }
  }, [productUcode])

  useEffect(() => {
    fetchProductAffiliationInfo()
  }, [fetchProductAffiliationInfo])

  const handleShowMoreAchievements = () => {
    setShowMoreAchievements(true)
  }

  const renderAffiliationType = () => {
    if (productAffiliationInfo.affiliationType === 'ANYONE') {
      return t('general.affiliation_open')
    }

    return t('general.approval_by_producer')
  }

  const renderCommission = () => {
    if (isSubscription) {
      return t('product_details.recurrent_gain')
    }

    return <Tag id="general_affiliation_global" size="sm" type="green">{productAffiliationInfo.commission}%</Tag>
  }

  const renderAffiliationRule = () => {
    if (productAffiliationInfo.affiliationRule.rule === 'FIRST_COOKIE_COUNTS') {
      return t('filters.labels.affiliation_rule.first_click')
    }

    if (productAffiliationInfo.affiliationRule.rule === 'LAST_COOKIE_COUNTS') {
      return t('filters.labels.affiliation_rule.last_click')
    }

    return (
      <>
        {t('filters.labels.affiliation_rule.multi_click')}
        {productAffiliationInfo.affiliationRule.multipleCookieCommission && (
          <>
            {` - `}<Trans i18nKey={'general.first_affiliate'} values={{ percentage: `${productAffiliationInfo.affiliationRule.multipleCookieCommission.first}%` }}>
              <strong></strong>
            </Trans>{` `}
            <Trans i18nKey={'general.last_affiliate'} values={{ percentage: `${productAffiliationInfo.affiliationRule.multipleCookieCommission.last}%` }}>
              <strong></strong>
            </Trans>
          </>
        )}
      </>
    )
  }

  const renderCookieDuration = () => {
    if (productAffiliationInfo.affiliationCookieDuration >= 0) {
      return <Trans i18nKey={'general.number_of_days'} values={{ days: productAffiliationInfo.affiliationCookieDuration }}/>
    }

    return t('product_details.tags.eternal_cookie')
  }

  const renderBonusAffiliation = () => {
    if (productAffiliationInfo.hasBonusAffiliation) {
      return <Tag id="tag_bonus_affiliation" size="sm" type="green">{t('general.on')}</Tag>
    }

    return <Tag id="tag_bonus_affiliation" size="sm">{t('general.off')}</Tag>
  }

  const renderHotleads = () => {
    if (productAffiliationInfo.hasHotleads) {
      return <Tag id="tag_hotleads" size="sm" type="green">{t('general.on')}</Tag>
    }

    return <Tag id="tag_hotleads" size="sm">{t('general.off')}</Tag>
  }

  const renderAffiliationNature = () => {
    if (userLocale === 'pt-br' && productAffiliationInfo.personType) {
      if (productAffiliationInfo.personType === AffiliationStatus.PersonTypeLegalPerson) {
        return (
          <Table.Tr>
            <Table.Td>{t('general.affiliation_nature')}</Table.Td>
            <Table.Td>{t('general.person_legal')}</Table.Td>
          </Table.Tr>
        )
      }

      return (
        <Table.Tr>
          <Table.Td>{t('general.affiliation_nature')}</Table.Td>
          <Table.Td>{t('general.person_individual_legal')}</Table.Td>
        </Table.Tr>
      )
    }

    return null
  }

  const renderAffiliationGlobal = () => {
    if (productAffiliationInfo.hasGlobalAffiliation) {
      return <Tag id="tag_affiliation_global" size="sm" type="green">{t('general.on')}</Tag>
    }

    return <Tag id="tag_affiliation_global" size="sm">{t('general.off')}</Tag>
  }

  const renderRowSupportEmail = () => {
    if (productAffiliationInfo.supportEmail && productAffiliationInfo.supportEmail) {
      return (
        <Table.Tr>
          <Table.Td>{t('product_details.support_email')}</Table.Td>
          <Table.Td>
            <a href={`mailto:${productAffiliationInfo.supportEmail}`}>{productAffiliationInfo.supportEmail}</a>
          </Table.Td>
        </Table.Tr>
      )
    }

    return null
  }

  const renderAchievements = () => {
    if (productAffiliationInfo.approvalRule && productAffiliationInfo.approvalRule.badges) {
      const totalBadges = productAffiliationInfo.approvalRule.badges.length
      const showButtonMore = totalBadges > SHOW_TOTAL_BADGES && !showMoreAchievements
      const badges = showButtonMore
        ? productAffiliationInfo.approvalRule.badges.slice(0, SHOW_TOTAL_BADGES)
        : productAffiliationInfo.approvalRule.badges

      return (
        <Table.Tr>
          <Table.Td className="affiliation-table-row">{t('general.achievements')}</Table.Td>
          <Table.Td className="_pt-1 _pb-1">
            {badges.map(badge => (
              <Tag key={badge.id} id={`achievements-${achievementsLabels[badge.name]}`} size="sm" type="green" className="_mt-2 _mb-2 _mr-3">{t(achievementsLabels[badge.name])}</Tag>
            ))}
            {showButtonMore && (
              <Button
                type="button"
                variation="tertiary"
                size="sm"
                onClick={handleShowMoreAchievements}>
                {t('general.see_more')}
              </Button>
            )}
          </Table.Td>
        </Table.Tr>
      )
    }

    return null
  }

  const renderENotes = () => {
    if (productAffiliationInfo.approvalRule && productAffiliationInfo.approvalRule.hasENote) {
      return <Tag id="enote_on" size="sm" type="green">{t('general.on')}</Tag>
    }

    return <Tag id="enote_off" size="sm">{t('general.off')}</Tag>
  }

  const renderLegalNature = () => {
    if (userLocale === 'pt-br' && productAffiliationInfo.approvalRule?.affiliationPersonType) {
      if (productAffiliationInfo.approvalRule.affiliationPersonType === AffiliationStatus.PersonTypeIndivitualEntity) {
        return (
          <Table.Tr>
            <Table.Td>{t('general.legal_nature')}</Table.Td>
            <Table.Td>{t('general.person_individual')}</Table.Td>
          </Table.Tr>
        )
      }

      return (
        <Table.Tr>
          <Table.Td>{t('general.legal_nature')}</Table.Td>
          <Table.Td>{t('general.person_legal')}</Table.Td>
        </Table.Tr>
      )
    }

    return null
  }

  const renderAutomaticCancellation = () => {
    if (productAffiliationInfo.approvalRule && productAffiliationInfo.approvalRule.hasAutomaticCancellation) {
      return <Tag id="automatic_cancellation_on" size="sm" type="green">{t('general.on')}</Tag>
    }

    return <Tag id="automatic_cancellation_off" size="sm">{t('general.off')}</Tag>
  }

  const renderInputCheckboxTerms = () => {
    return (
      <InputCheckbox
        id={`affiliate-confirmation-checkbox`}
        className="_m-0"
        label={(
          <Trans i18nKey="product_details.affiliate.confirmation.agree_to_the_terms">
            <a href={getTermsLinkByLocale} target="_blank" rel="noreferrer"> </a>
          </Trans>
        )}
        checked={isAgreeTermsChecked}
        onChange={handleChangeAgreeTerms}
      />
    )
  }

  const renderTable = () => {
    if (isLoadingAffiliationInfo) {
      return <Loader />
    }

    if (errorGetData) {
      return renderInputCheckboxTerms()
    }

    return (
      <>
        <p className="_mb-5 _text-3">{t('product_details.affiliate.confirmation.rules_defined_by_the_producer')}</p>
        <Table border="bordered" className="_mb-5 hot-table--responsive-sm">
          <Table.Body>
            <Table.Tr>
              <Table.Td className="affiliation-table-row">{t('general.affiliation_type')}</Table.Td>
              <Table.Td>{renderAffiliationType()}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>{t('general.commission')}</Table.Td>
              <Table.Td>{renderCommission()}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>{t('filters.labels.affiliation_rule.title')}</Table.Td>
              <Table.Td>{renderAffiliationRule()}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>{t('general.validity_of_cookies')}</Table.Td>
              <Table.Td>{renderCookieDuration()}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>{t('general.affiliation_bonus')}</Table.Td>
              <Table.Td>{renderBonusAffiliation()}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>{t('general.hotleads')}</Table.Td>
              <Table.Td>{renderHotleads()}</Table.Td>
            </Table.Tr>
            {renderAffiliationNature()}
            <Table.Tr>
              <Table.Td>{t('general.affiliation_global')}</Table.Td>
              <Table.Td>{renderAffiliationGlobal()}</Table.Td>
            </Table.Tr>
            {renderRowSupportEmail()}
          </Table.Body>
        </Table>

        {productAffiliationInfo.approvalRule && (
          <>
            <p className="_mb-5 _text-3">{t('general.automatic_approval')}</p>
            <Table border="bordered" className="_mb-5 hot-table--responsive-sm">
              <Table.Body>
                {renderAchievements()}
                {renderLegalNature()}
                <Table.Tr>
                  <Table.Td className="affiliation-table-row">{t('general.using_enotes')}</Table.Td>
                  <Table.Td>{renderENotes()}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>{t('general.automatic_cancellation')}</Table.Td>
                  <Table.Td>{renderAutomaticCancellation()}</Table.Td>
                </Table.Tr>
              </Table.Body>
            </Table>
          </>
        )}

        {renderInputCheckboxTerms()}
      </>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="modal-affiliate hot-modal--lg">
      <Modal.Header>
        <h6 className="_mb-0 _text-4">{t('product_details.affiliate.confirmation.title_request')}</h6>
      </Modal.Header>
      <Modal.Body>
        <Alert variation="warning">
          <div className="_d-flex _align-items-start _justify-content-start">
            <div className="_d-flex _align-items-center _justify-content-center _mr-4">
              <Icon type="solid" iconName="exclamation-triangle" width={18} />
            </div>
            <div>
              <p className="_font-weight-bold">
                {t('product_details.affiliate.confirmation.title_affiliate')}
              </p>
              <ul className="_pl-4">
                <li className="_line-height">
                  {t('product_details.affiliate.confirmation.term_1')}
                </li>
                <li className="_line-height">
                  {t('product_details.affiliate.confirmation.term_2')}
                </li>
                <li className="_line-height">
                  {t('product_details.affiliate.confirmation.term_3')}
                </li>
              </ul>
            </div>
          </div>
        </Alert>

        <div className="_p-5 _rounded _border _border-gray-200">
          {renderTable()}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {!isLoadingAffiliationInfo && (
          <div className="_d-flex _flex-grow-1 _justify-content-end">
            <Button
              className="_mr-4"
              variation="tertiary"
              onClick={onClose}>
              {t('general.cancel')}
            </Button>
            <Button
              disabled={!isAgreeTermsChecked}
              onClick={onClick}
              variation="primary">
              {t('product_details.affiliate.confirmation.btn_request')}
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ProductAffiliateConfirmationModal
