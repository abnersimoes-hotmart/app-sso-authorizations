import { platformRedirect } from 'utils/platformMessage'
import formatUserLocale from 'utils/userLocaleFormat'

import { AffiliationStatus } from 'utils/constants'

const handleGoToFinancialInformation = user => {
  if (user.profile.address.country === 'Brasil') {
    platformRedirect('/accounts/settings?tab=financial')
  } else {
    platformRedirect('/accounts/hotpay/add')
  }
}

const handleGotToPersonalInformation = () => {
  platformRedirect('/accounts/settings?tab=profile')
}

const checkIfUserEntityTypeCompatible = (affiliationDetails, entityType) => {
  return affiliationDetails.personType === AffiliationStatus.PersonTypeLegalPerson
    ? entityType === AffiliationStatus.PersonTypeLegalEntity
    : true
}

export const getButtonType = (user, affiliationDetails, productInfo, handleOpenTOS, hasAffiliationBlock) => {
  const buttonProperties = {
    title: '',
    button: '',
    color: '',
    buttonVariation: '',
    hasButton: true,
    clickAction: handleOpenTOS
  }

  const {
    profile: { hasBasicInfo, entityType }
  } = user

  const isUserEntityTypeCompatible = checkIfUserEntityTypeCompatible(affiliationDetails, entityType)

  const handleGoToDivulgationLinks = () => {
    platformRedirect('/hotlinks/:productId', { productId: productInfo.id })
  }

  const handleGoToProductPage = () => {
    platformRedirect(`/products/manage/:productId`, { productId: productInfo.id })
  }

  const handleGoToBlog = () => {
    window.open(`https://atendimento.hotmart.com.br/hc/${formatUserLocale(user.profile.locale)}/requests/new`)
  }

  const affiliateActionsMap = [
    () => {
      if (affiliationDetails.affiliationRequestAction === AffiliationStatus.Blocked) {
        buttonProperties.title = 'product_details.affiliate.affiliation_blocked'
        buttonProperties.hasButton = false
        buttonProperties.color = 'gray'
      }
    },
    () => {
      if (!isUserEntityTypeCompatible) {
        buttonProperties.title = 'product_details.affiliate.not_allowed_for_individual_person'
        buttonProperties.hasButton = false
        buttonProperties.color = 'gray'
      }
    },
    () => {
      if (hasBasicInfo && isUserEntityTypeCompatible && affiliationDetails.userEligibleToBind) {
        if (affiliationDetails.affiliationRequestAction === AffiliationStatus.Promote) {
          buttonProperties.title = 'product_details.affiliate.1clique'
          buttonProperties.button = 'product_details.affiliate.affiliate_now'
          buttonProperties.color = 'green'
          buttonProperties.buttonVariation = 'success'
          buttonProperties.hasButton = true
          buttonProperties.clickAction = handleOpenTOS
        } else if (affiliationDetails.affiliationRequestAction === AffiliationStatus.AffiliationRequest) {
          buttonProperties.title = 'product_details.affiliate.affiliate_now'
          buttonProperties.button = 'product_details.affiliate.request_affiliation'
          buttonProperties.color = 'green'
          buttonProperties.buttonVariation = 'success'
          buttonProperties.hasButton = true
          buttonProperties.clickAction = handleOpenTOS
        }
      }
    },
    () => {
      if (affiliationDetails.affiliationRequestAction === AffiliationStatus.NoButton) {
        buttonProperties.title = 'product_details.affiliate.affiliation_not_allowed'
        buttonProperties.hasButton = false
        buttonProperties.color = 'gray'
      }
    },
    () => {
      if (
        hasBasicInfo &&
        affiliationDetails.userEligibleToBind &&
        affiliationDetails.affiliationRequestAction === AffiliationStatus.Pending
      ) {
        buttonProperties.title = 'product_details.affiliate.request_sent'
        buttonProperties.hasButton = false
        buttonProperties.color = 'blue'
      }
    },
    () => {
      if (!hasBasicInfo) {
        buttonProperties.title = 'product_details.affiliate.complete_your_register'
        buttonProperties.button = 'product_details.affiliate.complete_register'
        buttonProperties.color = 'blue'
        buttonProperties.buttonVariation = 'primary'
        buttonProperties.hasButton = true
        buttonProperties.clickAction = handleGotToPersonalInformation
      }
    },
    () => {
      if (hasBasicInfo && !affiliationDetails.userEligibleToBind) {
        buttonProperties.title = 'product_details.affiliate.user_international_without_brasilian_account'
        buttonProperties.button = 'product_details.affiliate.add_financial_account'
        buttonProperties.color = 'blue'
        buttonProperties.buttonVariation = 'primary'
        buttonProperties.hasButton = true
        buttonProperties.clickAction = () => handleGoToFinancialInformation(user)
      }
    },
    () => {
      if (affiliationDetails.affiliationRequestAction === AffiliationStatus.NotPermitted) {
        buttonProperties.title = 'product_details.affiliate.affiliation_not_allowed'
        buttonProperties.hasButton = false
        buttonProperties.color = 'gray'
      }
    },
    () => {
      if (hasAffiliationBlock) {
        buttonProperties.title = 'product_details.affiliate.affiliation_blocked_by_bk'
        buttonProperties.button = 'product_details.affiliate.go_to_blog'
        buttonProperties.color = 'red'
        buttonProperties.buttonVariation = 'danger'
        buttonProperties.clickAction = handleGoToBlog
      }
    },
    () => {
      if (
        hasBasicInfo &&
        affiliationDetails.userEligibleToBind &&
        affiliationDetails.affiliationRequestAction === AffiliationStatus.AlredyAffiliated
      ) {
        buttonProperties.title = 'product_details.affiliate.already_affiliated'
        buttonProperties.button = 'product_details.affiliate.see_links'
        buttonProperties.color = 'green'
        buttonProperties.buttonVariation = 'success'
        buttonProperties.hasButton = true
        buttonProperties.clickAction = handleGoToDivulgationLinks
      }
    },
    () => {
      if (affiliationDetails.userIsOwner) {
        buttonProperties.title = 'product_details.affiliate.your_product'
        buttonProperties.button = 'product_details.affiliate.manage_product'
        buttonProperties.color = 'blue'
        buttonProperties.buttonVariation = 'primary'
        buttonProperties.clickAction = handleGoToProductPage
      }
    }
  ]

  affiliateActionsMap.forEach(item => item())

  return buttonProperties
}
