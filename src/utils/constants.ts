import { getLanguagesToShowSpecialCampaign } from 'utils/specialCampaign'

export const ProductsCardsPerPage = 20

export const ProductsCardsPerCarousel = 11

export const UserBlockledByBK = 'BK_REQUEST_AFFILIATE'

export const DefaultIconSize = 3

export const CurrentSpecialCampaign = 'Gastronomia'
export const LanguagesToShowSpecialCampaign = getLanguagesToShowSpecialCampaign()

export const WindowSize = {
  EXTRA_SMALL: 281,
  SMALL: 577,
  MEDIUM: 768,
  LARGE: 992,
  EXTRA_LARGE: 1200
}

export const isLargeOrLowerScreen = window.innerWidth <= WindowSize.LARGE
export const isMediumOrLowerScreen = window.innerWidth <= WindowSize.MEDIUM
export const isSmallScreen = window.innerWidth <= WindowSize.SMALL
export const isExtraSmallScreen = window.innerWidth <= WindowSize.EXTRA_SMALL

export const PostMessageTypes = {
  SCROLL_TO_TOP: 'SCROLL_TO_TOP'
}

export const MessageActions = {
  PLATFORM_ALERT: 'ALERT',
  PLATFORM_REDIRECT: 'REDIRECT',
  PLATFORM_LOGOUT: 'LOGOUT',
  PLATFORM_LOCAL_STORAGE: 'LOCAL_STORAGE'
}

export const MessageTypes = {
  SUCCESS: 'success',
  ERROR: 'error-label'
}

export const AffiliationStatus = {
  PersonTypeIndivitualEntity: 'INDIVIDUAL_ENTITY',
  PersonTypeLegalEntity: 'LEGAL_ENTITY',
  PersonTypeLegalPerson: 'LEGAL_PERSON',
  PersonTypeBoth: 'BOTH',
  AlredyAffiliated: 'ALREADY_AFFILIATE',
  Promote: 'PROMOTE',
  NoButton: 'NO_BUTTON',
  NotPermitted: 'NOT_PERMITED',
  Blocked: 'BLOCKED',
  Pending: 'REQUEST_PENDING',
  AffiliationRequest: 'AFFILIATION_REQUEST'
}

export const RouteNames = {
  ROOT: '/',
  PRODUCT_DETAILS: '/details',
  SEARCH_RESULTS: '/search',
  FAVORITE_RESULTS: '/favorites',
  COMMENTS_RESULTS: '/comments'
}

export const Environments = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
}

export const Currencies = {
  EURO: 'EUR',
  BRAZILIAN_REAL: 'BRL',
  ARGENTINE_PESO: 'ARS',
  AMERICAN_DOLLAR: 'USD',
  MEXICAN_PESO: 'MXN',
  PERUVIAN_NUEVO_SOL: 'PEN',
  COLOMBIAN_PESO: 'COP',
  CHILEAN_PESO: 'CLP',
  SWISS_FRANC: 'CHF',
  CANADIAN_DOLLAR: 'CAD',
  NIGERIAN_NAIRA: 'NGN',
  POUND: 'GBP',
  JAPANESE_YEN: 'JPY'
}

export const DefaultProfileImage = 'https://cosmos.hotmart.com/img/avatar.png'

export const CarouselDefaultPages = 1
export const CarouselDefaultRows = 11

export const AffiliationType = {
  oneClick: 0,
  approval: 1,
  noOne: 2
}

export const DefaultFilterValues = {
  DefaultAffiliationRule: '-1',
  DefaultAffiliationType: '-1',
  DefaultCommissionRange: 'DEFAULT',
  DefaultPriceRange: 'RANGE_0',
  DefaultCountry: '',
  DefaultCurrency: '',
  DefaultSearchInput: '',
  DefaultCategory: { id: 25, name: 'category.all.name' },
  DefaultFormat: { id: '0', name: 'product_details.format.all.name' }
}

export const CurrencySymbols = {
  EUR: '€',
  BRL: 'R$',
  ARS: 'ARS$',
  USD: 'USD$',
  MXN: 'MXN$',
  PEN: 'PEN$',
  COP: 'COP$',
  CLP: 'CLP$',
  CHF: 'CHF$',
  CAD: 'CAD$',
  NGN: 'NGN$',
  GBP: 'GBP$',
  JPY: 'JPY$'
}

export const SsoExpiredToken = 'THIRD-PARTY-APP.EXPIRED_TOKEN'
