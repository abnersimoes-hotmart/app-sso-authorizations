export const DefaultIconSize = 3

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

export const Environments = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
}

export const SsoExpiredToken = 'THIRD-PARTY-APP.EXPIRED_TOKEN'
