import Request from '@hotmart/request'

/**
 * MARKETPLACE PRODUCT
 */
Request.register(`${process.env.API_MARKET}/market`, {
  get: {
    'market.productDetails': '/product/:productUcode/details',
    'market.othersProducts': '/producer/:producerUcode/otherProducts?currentProductUcode=:productUcode&page=:pages&rows=:rows',
    'market.materialDivulgation': '/product/:productUcode/promotionalMedia?producerUcode=:producerUcode',
    'market.productDetailsWithSessionPullId': '/product/:productUcode/details?recommendationPullSessionId=:recommendationPullSessionId',
    'market.productOpinons': '/product/:productUcode/comments?rows=:rows&page=:page&evaluation=:evaluation',
    'market.productRating': '/product/:productUcode/rating',
    'market.affiliationInfo': '/product/:productUcode/affiliationInfo',
    'market.specialCampaingToggle': '/check-toggle?toggleName=:toggleName',
    'market.bookmarks': '/bookmarks?page=:page&rows=:rows'
  },
  post: {
    'market.search': '/search',
    'market.recommended': '/recommended/search',
    'market.hottest': '/hottest/search',
    'market.dearest': '/dearest/search',
    'market.latest': '/latest/search',
    'market.specialCampaign': '/campaign/search',
    'market.bookmark.post': '/bookmark'
  },
  delete: {
    'market.bookmark.delete': '/bookmark'
  }
})

Request.register(`${process.env.API_MARKET}/user`, {
  get: {
    'market.firstSales': '/first-sales'
  }
})

Request.register(`${process.env.API_MARKET}/filter`, {
  get: {
    'market.categories': '/categories',
    'market.countries': '/countries',
    'market.currencies': '/currencies',
    'market.languages': '/languages',
    'market.formats': '/formats'
  }
})

Request.register(`${process.env.API_AFFILIATION}`, {
  get: {
    'market.sendMessageToProducer': '/affiliates-program?productId=:productId'
  },
  post: {
    'market.affiliationRequest': '/affiliation-request',
    'market.affiliationRecommendationPullSessionId': '/affiliation-request?recommendationPullSessionId=:recommendationPullSessionId'
  }
})

Request.register(`${process.env.API_ACCOUNT_CONTROL}`, {
  get: {
    'accountControl.userBlocks': '/blockUser/user/current'
  }
})

Request.register(`${process.env.API_ABTEST}/api/1/test`, {
  post: {
    'abtest.execute': '/:testId/execute?transactionRef=:transactionRef',
    'abtest.execute.segmentation': '/:testId/segmentation/:segmentation/execute',
    'abtest.convert': '/:testId/convert/:transactionRef'
  }
})
