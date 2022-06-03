import { IBadge } from './producerInformation'

export interface IPrice {
  value: number,
  currency: string
}

export interface ICommission {
  currencyValue: {
    currencyCode: string
    value: number
  }
  description: string
  name: string
  recurringAffiliateCommissionValue: number
  recurringCommission: number
  recurringCommissionValue: number
  standardAffiliateCommissionValue: number
  standardCommission: number
  standardCommissionValue: number
  trialPeriod: number
}

export interface IOpinion {
  rate: string,
  text: string
}

export interface ICategory {
  id: number,
  name: string
}

export interface IProductInformation {
  affiliation: {
    commission: {
      percentage: number,
      price: {
        currency: string,
        value: number
      }
    }
  },
  producer: {
    name: string,
    ucode: string
  },
  product: {
    alt: string,
    blueprint: number,
    category: string,
    id: number,
    image: string,
    isSubscription: boolean,
    locale: string,
    name: string,
    price: {
      currency: string,
      value: number
    },
    reviewRating: number,
    salesPage: string,
    tags: {
      affiliationRule: string,
      affiliationType: string,
      hasAffiliationResource: boolean,
      hasAlternativePage: boolean,
      hasHotleads: boolean
    },
    temperature: number,
    totalAnswers: number,
    ucode: string,
    specialCampaigns?: Array<string | number>,
    pullSessionId?: string,
    bookmarked: boolean
  },
  pullSessionId?: string
}

export interface IPlans {
  currencyValue: {
    currencyCode: string
    value: number
  }
  description: string
  name: string
  recurringAffiliateCommissionValue: number
  recurringCommission: number
  recurringCommissionValue: number
  standardAffiliateCommissionValue: number
  standardCommission: number
  standardCommissionValue: number
  trialPeriod: number
}

interface IOffers {
  offerDescription: string,
  price: {
    value: number,
    currencyCode: string
  },
  recoveryWithSmartInstallment: boolean
}

export interface IProductDetails {
  userProfile: {
    name: string,
    signupYear: number,
    tradeName: string,
    userBadges: Array<IBadge>,
    urlPhoto: string,
    ucode: string
  },
  productDetails: {
    alt: string,
    description: string,
    distributionForm: string,
    format: string,
    supportEmail: string,
    language: string,
    affiliatesProgramInformation: string,
    plans: Array<IPlans>,
    blueprint: number,
    hasBlackNovemberCoupon?: boolean,
    blackNovember?: {
      coupon: string,
    },
    checkoutLink: string,
    id: number,
    image: string,
    isSubscription: boolean,
    name: string,
    offers: Array<IOffers>,
    pageSalesLink: string,
    price: {
      currency: string,
      value: number
    },
    reviewRating: number,
    temperature: number,
    ucode: string,
    bookmarked: boolean,
    tags: {
      affiliationCookieDuration: number,
      affiliationRule: string,
      affiliationType: string,
      hasAffiliationResource: boolean,
      hasAlternativePage: boolean,
      hasHotleads: boolean
    }
  },
  affiliationDetails: {
    type?: number,
    affiliationRequestAction: string,
    personType: string,
    userEligibleToBind: boolean,
    userIsOwner: boolean
    commission: {
      percentage: number,
      price: {
        currency: string,
        value: number
      }
    }
  }
}

export interface IMaterialTags {
  id: string,
  type: string,
  count: number
}

export interface IMaterialModal {
  type: string,
  name: string,
  source: string
}
