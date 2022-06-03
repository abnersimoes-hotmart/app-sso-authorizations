import { useCallback, useReducer } from 'react'

const Types = {
  RECOMMENDED: 'recommendedProductsList',
  HOTTEST: 'hottestProductsList',
  DEAREST: 'dearestProductsList',
  NEWEST: 'newestProductsList',
  SPECIAL_CAMPAIGN: 'specialCampaignProductsList',
  SHOW_MARKET_ONBOARDING: 'showMarketOnboarding',
  SHOW_MARKET_HELP: 'showMarketHelp',
  LOADING_RECOMMENDED: 'isLoadingRecommended',
  LOADING_HOTTEST: 'isLoadingHottest',
  LOADING_DEAREST: 'isLoadingDearest',
  LOADING_NEWEST: 'isLoadingNewest',
  LOADING_SPECIAL_CAMPAIGN: 'isLoadingSpecialCampaign',
  IS_SPECIAL_CAMPAIGN_ACTIVE: 'isSpecialCampaignActive'
}

const updateCarousels = (state, key, value) => {
  return {
    ...state,
    [key]: value
  }
}

const reducer = (state, action) => {
  return updateCarousels(state, action.type, action.value)
}

const serializedState = localStorage.getItem('showMarketOnboarding')

const initialState = {
  recommendedProductsList: [],
  hottestProductsList: [],
  dearestProductsList: [],
  newestProductsList: [],
  specialCampaignProductsList: [],
  showMarketOnboarding: serializedState === null || serializedState === 'true',
  showMarketHelp: false,
  isLoadingRecommended: true,
  isLoadingHottest: true,
  isLoadingDearest: true,
  isLoadingNewest: true,
  isLoadingSpecialCampaign: true,
  isSpecialCampaignActive: false
}

const useProductCarouselState = () => {
  const [state, dispatchCarouselState] = useReducer(reducer, initialState)

  const setRecommendedProductsList = useCallback(value => {
    dispatchCarouselState({ type: Types.RECOMMENDED, value })
  }, [])

  const setHottestProductsList = useCallback(value => {
    dispatchCarouselState({ type: Types.HOTTEST, value })
  }, [])

  const setDearestProductsList = useCallback(value => {
    dispatchCarouselState({ type: Types.DEAREST, value })
  }, [])

  const setNewestProductsList = useCallback(value => {
    dispatchCarouselState({ type: Types.NEWEST, value })
  }, [])

  const setSpecialCampaignProductsList = useCallback(value => {
    dispatchCarouselState({ type: Types.SPECIAL_CAMPAIGN, value })
  }, [])

  const setShowMarketOnboarding = useCallback(value => {
    dispatchCarouselState({ type: Types.SHOW_MARKET_ONBOARDING, value })
  }, [])

  const setShowMarketHelp = useCallback(value => {
    dispatchCarouselState({ type: Types.SHOW_MARKET_HELP, value })
  }, [])

  const setIsLoadingRecommended = useCallback(value => {
    dispatchCarouselState({ type: Types.LOADING_RECOMMENDED, value })
  }, [])

  const setIsLoadingHottest = useCallback(value => {
    dispatchCarouselState({ type: Types.LOADING_HOTTEST, value })
  }, [])

  const setIsLoadingDearest = useCallback(value => {
    dispatchCarouselState({ type: Types.LOADING_DEAREST, value })
  }, [])

  const setIsLoadingNewest = useCallback(value => {
    dispatchCarouselState({ type: Types.LOADING_NEWEST, value })
  }, [])

  const setIsLoadingSpecialCampaign = useCallback(value => {
    dispatchCarouselState({ type: Types.LOADING_SPECIAL_CAMPAIGN, value })
  }, [])

  const setIsSpecialCampaignActive = useCallback(value => {
    dispatchCarouselState({ type: Types.IS_SPECIAL_CAMPAIGN_ACTIVE, value })
  }, [])

  return {
    values: state,
    setRecommendedProductsList,
    setHottestProductsList,
    setDearestProductsList,
    setNewestProductsList,
    setSpecialCampaignProductsList,
    setShowMarketOnboarding,
    setShowMarketHelp,
    setIsLoadingRecommended,
    setIsLoadingHottest,
    setIsLoadingDearest,
    setIsLoadingNewest,
    setIsLoadingSpecialCampaign,
    setIsSpecialCampaignActive
  }
}

export default useProductCarouselState
