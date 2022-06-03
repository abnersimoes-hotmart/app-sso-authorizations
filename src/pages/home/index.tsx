import React, { Suspense, useCallback, useEffect } from 'react'

import useProductCarouselState from './useProductCarouselState'
import { useTranslation, Trans } from 'react-i18next'
import { LanguagesToShowSpecialCampaign, RouteNames } from 'utils/constants'
import { useSelector, useDispatch } from 'react-redux'

import { getCurrentSpecialCampaignByDateAndLocale } from 'utils/specialCampaign'
import { platformRedirect } from 'utils/platformMessage'
import { setBreadcrumb } from 'ducks/breadcrumb'
import { sendInteractionEvent, sendPageViewEvent } from 'utils/gaEvent'
import { setInitialState, setSelectedOrderBy } from 'ducks/filters'

import { useFetchSpecialCampaignQuery } from 'api/useFetchSpecialCampaignQuery'
import { useFetchRecommendedQuery } from 'api/useFetchRecommendedQuery'
import { useFetchHottestQuery } from 'api/useFetchHottestQuery'
import { useFetchNewestQuery } from 'api/useFetchNewestQuery'
import { useFetchDearestQuery } from 'api/useFetchDearestQuery'

import Header from 'components/header'
import Filter from 'components/filter'
import FirstSaleChallenge from 'components/firstSaleChallenge'
import HelpFAQ from 'components/helpFAQ'
import { IS_PRODUCTION_ENVIRONMENT } from 'utils/environment'
import { ProductCarousel } from 'components/product'
import { setCategoriesList } from 'ducks/categories'
import { useVulcanoContext } from 'src/VulcanoContext'
import { Button, Loader } from 'components/basic'
import { getProductsCategories, getIsSpecialCampaignActive } from 'services/market'
import { RootState } from 'ducks/index'

import '../style.scss'

const showRecommendedCarouselLanguages = ['PT_BR', 'ES']

const Home = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const {
    user: {
      profile: { hasBasicInfo, locale: language, id }
    }
  } = useVulcanoContext()

  const currentSpecialCampaign = getCurrentSpecialCampaignByDateAndLocale(language)

  const { isLanguageSwitchOn, selectedLanguage } = useSelector(({ filters }: RootState) => filters)

  const { values, setShowMarketHelp, setIsSpecialCampaignActive } = useProductCarouselState()

  const { isSpecialCampaignActive } = values

  const languageToUse = useCallback(() => {
    if (isLanguageSwitchOn) {
      return language
    } else if (selectedLanguage === '') {
      return ''
    }
    return selectedLanguage
  }, [isLanguageSwitchOn, language, selectedLanguage])

  const locale = languageToUse()

  const fetchSpecialCampaignQuery = useFetchSpecialCampaignQuery(locale, language)
  const fetchRecommendedQuery = useFetchRecommendedQuery(locale)
  const fetchHottestQuery = useFetchHottestQuery(locale)
  const fetchNewestQuery = useFetchNewestQuery(locale)
  const fetchDearestQuery = useFetchDearestQuery(locale)

  const generateBreadcrumb = useCallback(() => {
    const breadcrumb = [
      {
        item: t('general.title'),
        link: `${RouteNames.ROOT}`,
        isActive: false
      }
    ]

    dispatch(setBreadcrumb(breadcrumb))
  }, [dispatch, t])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getProductsCategories()

      dispatch(setCategoriesList(response))
    }

    fetchCategories()
  }, [dispatch])

  useEffect(() => {
    generateBreadcrumb()
  }, [generateBreadcrumb])

  useEffect(() => {
    dispatch(setInitialState())
  }, [dispatch])

  useEffect(() => {
    if (IS_PRODUCTION_ENVIRONMENT) {
      const cluster = sessionStorage.getItem('cluster')
      const pageView = {
        subsection2: 'Home',
        logged: Boolean(id),
        language,
        ...(cluster && cluster !== 'undefined' && { cluster })
      }

      sendPageViewEvent(pageView)
    }
  }, [id, language])

  useEffect(() => {
    const fetchIsSpecialCampaignActive = async () => {
      if (currentSpecialCampaign) {
        const response = await getIsSpecialCampaignActive({ toggleName: currentSpecialCampaign?.toggleName })

        setIsSpecialCampaignActive(response && LanguagesToShowSpecialCampaign.includes(language))
      }
    }

    fetchIsSpecialCampaignActive()
  }, [language, setIsSpecialCampaignActive, currentSpecialCampaign])

  const handleFilter = () => {
    languageToUse()

    // Force Refetch Cache Loading
    setTimeout(() => {
      fetchSpecialCampaignQuery.refetch()
      fetchRecommendedQuery.refetch()
      fetchHottestQuery.refetch()
      fetchNewestQuery.refetch()
      fetchDearestQuery.refetch()
    }, 200)
  }

  const seeMoreLinkActionRecommended = () => {
    sendInteractionEvent({
      eventAction: 'Click:SeeMore',
      eventLabel: 'Recommended'
    })

    dispatch(setInitialState())
    dispatch(setSelectedOrderBy('recommended'))
  }

  const seeMoreLinkActionHottest = () => {
    sendInteractionEvent({
      eventAction: 'Click:SeeMore',
      eventLabel: 'Hottest'
    })

    dispatch(setInitialState())
    dispatch(setSelectedOrderBy('hottest'))
  }

  const seeMoreLinkActionSpecialCampaign = () => {
    sendInteractionEvent({
      eventAction: 'Click:SeeMore',
      eventLabel: currentSpecialCampaign?.eventLabel
    })

    dispatch(setInitialState())
    dispatch(setSelectedOrderBy('specialCampaign'))
  }

  const seeMoreLinkActionDearest = () => {
    sendInteractionEvent({
      eventAction: 'Click:SeeMore',
      eventLabel: 'MostLoved'
    })

    dispatch(setInitialState())
    dispatch(setSelectedOrderBy('dearest'))
  }

  const seeMoreLinkActionNewest = () => {
    sendInteractionEvent({
      eventAction: 'Click:SeeMore',
      eventLabel: 'MostRecent'
    })

    dispatch(setInitialState())
    dispatch(setSelectedOrderBy('newest'))
  }

  const handleGotToPersonalInformation = () => {
    platformRedirect('/accounts/settings?tab=profile')
  }

  const handleIsOpenMarketHelp = isOpen => {
    setShowMarketHelp(isOpen)
  }

  const renderCarousel = carouselInfo => {
    const {
      productsList,
      conditionToShowCarousel,
      carouselId,
      loading,
      isSpecialCampaign,
      title,
      subtitle,
      seeMorePath,
      seeMoreLinkAction
    } = carouselInfo

    if (productsList?.length > 0 && conditionToShowCarousel) {
      return (
        <ProductCarousel
          id={carouselId}
          isLoading={loading}
          isSpecialCampaign={isSpecialCampaign}
          currentSpecialCampaign={currentSpecialCampaign}
          title={
            <Trans i18nKey={title}>
              <span></span>
            </Trans>
          }
          subtitle={t(subtitle)}
          seeMorePath={seeMorePath}
          seeMoreLinkAction={seeMoreLinkAction}
          seeMoreLink={t('general.show_all')}
          className="section-products"
          products={productsList}
        />
      )
    }

    return ''
  }

  return (
    <Suspense fallback={<Loader />}>
      <HelpFAQ isOpen={values.showMarketHelp} onClose={() => handleIsOpenMarketHelp(false)} />

      <div className="page-containers">
        {!hasBasicInfo && (
          <hot-alert dismissible class="hot-alert--info _mt-5">
            <div className="row _d-flex _align-items-center">
              <div className="hot-col-9">{t('complete_registration.text')}</div>
              <div className="hot-col-3 _d-flex _justify-content-end">
                <Button variation="primary" onClick={handleGotToPersonalInformation}>
                  {t('complete_registration.button')}
                </Button>
              </div>
            </div>
          </hot-alert>
        )}

        <div className="hot-container">
          <Header
            pageTitle={'general.title'}
            handleIsOpenMarketHelp={handleIsOpenMarketHelp}
            showButtonFAQ
            className="_mt-7"
          />
          <Filter handleFilter={handleFilter} />
          <FirstSaleChallenge />
          {(fetchDearestQuery.isLoading ||
            fetchHottestQuery.isLoading ||
            fetchNewestQuery.isLoading ||
            fetchRecommendedQuery.isLoading ||
            fetchSpecialCampaignQuery.isLoading) && <Loader />}
          {renderCarousel({
            productsList: fetchSpecialCampaignQuery.data?.content,
            conditionToShowCarousel: isSpecialCampaignActive,
            isSpecialCampaign: true,
            carouselId: currentSpecialCampaign?.eventLabel,
            loading: fetchSpecialCampaignQuery.isLoading,
            title: currentSpecialCampaign?.labels.title,
            subtitle: currentSpecialCampaign?.labels.description,
            seeMorePath: `.${RouteNames.SEARCH_RESULTS}?orderBy=specialCampaign&page=1`,
            seeMoreLinkAction: seeMoreLinkActionSpecialCampaign
          })}
          {renderCarousel({
            productsList: fetchRecommendedQuery.data?.content,
            conditionToShowCarousel: showRecommendedCarouselLanguages.includes(language),
            carouselId: 'Recommended',
            loading: fetchRecommendedQuery.isLoading,
            title: 'recommended.title',
            subtitle: 'recommended.description',
            seeMorePath: `.${RouteNames.SEARCH_RESULTS}?orderBy=recommended&page=1`,
            seeMoreLinkAction: seeMoreLinkActionRecommended
          })}
          {renderCarousel({
            productsList: fetchHottestQuery.data?.content,
            conditionToShowCarousel: true,
            carouselId: 'Hottest',
            loading: fetchHottestQuery.isLoading,
            title: 'hottest.title',
            subtitle: 'hottest.description',
            seeMorePath: `.${RouteNames.SEARCH_RESULTS}?orderBy=hottest&page=1`,
            seeMoreLinkAction: seeMoreLinkActionHottest
          })}
          {renderCarousel({
            productsList: fetchDearestQuery.data?.content,
            conditionToShowCarousel: true,
            carouselId: 'MostLoved',
            loading: fetchDearestQuery.isLoading,
            title: 'dearests.title',
            subtitle: 'dearests.description',
            seeMorePath: `.${RouteNames.SEARCH_RESULTS}?orderBy=dearest&page=1`,
            seeMoreLinkAction: seeMoreLinkActionDearest
          })}
          {renderCarousel({
            productsList: fetchNewestQuery.data?.content,
            conditionToShowCarousel: true,
            carouselId: 'MostRecent',
            loading: fetchNewestQuery.isLoading,
            title: 'newest.title',
            subtitle: 'newest.description',
            seeMorePath: `.${RouteNames.SEARCH_RESULTS}?orderBy=newest&page=1`,
            seeMoreLinkAction: seeMoreLinkActionNewest
          })}
        </div>
      </div>
    </Suspense>
  )
}

export default Home
