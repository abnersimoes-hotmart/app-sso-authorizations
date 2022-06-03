import Request from '@hotmart/request'

export const getMarketProducts = params => {
  return Request('market.search', params)
}

export const getProductComments = params => {
  return Request('market.productOpinons', params)
}

export const getProductRating = params => {
  return Request('market.productRating', params)
}

export const getMarketRecommendedProducts = params => {
  return Request('market.recommended', params)
}

export const getMarketHottestProducts = params => {
  return Request('market.hottest', params)
}

export const getMarketDearestProducts = params => {
  return Request('market.dearest', params)
}

export const getMarketLatestProducts = params => {
  return Request('market.latest', params)
}

export const getSpecialCampaignProducts = params => {
  return Request('market.specialCampaign', params)
}

export const getProductDetails = params => {
  return Request('market.productDetails', params)
}

export const getProductAffiliationInfo = params => {
  return Request('market.affiliationInfo', params)
}

export const getOtherProductsFromProducer = params => {
  return Request('market.othersProducts', params)
}

export const requestAffiliation = params => {
  return Request('market.affiliationRequest', params)
}

export const sendRecommendationPullSessionIdDetails = params => {
  return Request('market.productDetailsWithSessionPullId', params)
}

export const getRequireMessageToProducer = params => {
  return Request('market.sendMessageToProducer', params)
}

export const getProductDivulgationMaterial = params => {
  return Request('market.materialDivulgation', params)
}

export const getProductsCategories = () => {
  return Request('market.categories')
}

export const getFilterCountries = () => {
  return Request('market.countries')
}

export const getFilterCurrencies = () => {
  return Request('market.currencies')
}

export const getFilterLanguages = () => {
  return Request('market.languages')
}

export const getFilterProductFormats = () => {
  return Request('market.formats')
}

export const getIsSpecialCampaignActive = params => {
  return Request('market.specialCampaingToggle', params)
}

export const getMarketUserFirstSales = () => {
  return Request('market.firstSales')
}

export const getMarketFavoriteProducts = params => {
  return Request('market.bookmarks', params)
}

export const sendMarketAddFavoriteProduct = params => {
  return Request('market.bookmark.post', params)
}

export const sendMarketRemoveFavoriteProduct = params => {
  return Request('market.bookmark.delete', params)
}
