import React, { useState, useEffect, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { getMarketUserFirstSales } from 'services/market'
import { sendInteractionEvent } from 'utils/gaEvent'
import { AlertCard } from 'components/basic'

interface IFirstSalesProps {
  firstSales: boolean
  pageLink: string
}

const FirstSaleChallenge = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dataFirstSales, setDataFirstSales] = useState<IFirstSalesProps | null>(null)

  const fetchDataFirstSales = useCallback(async () => {
    try {
      const response = await getMarketUserFirstSales()

      if (response && response.firstSales) {
        const status = localStorage.getItem('statusFirstSaleChallenge') || 'noInteraction'

        setDataFirstSales(response)
        setIsVisible(status !== 'DoubleClicked')
        setIsLoading(false)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDataFirstSales()
  }, [fetchDataFirstSales])

  const onClick = () => {
    sendInteractionEvent({
      eventAction: 'Click:AccessContent:Access',
      eventLabel: 'Access Content'
    })
  }

  const onClose = () => {
    sendInteractionEvent({
      eventAction: 'Click:AccessContent:Close',
      eventLabel: 'Close'
    })

    setIsVisible(false)

    // Experimental interaction
    const status = localStorage.getItem('statusFirstSaleChallenge') || 'noInteraction'

    if (status === 'noInteraction') {
      localStorage.setItem('statusFirstSaleChallenge', 'Clicked')
    }

    if (status === 'Clicked') {
      localStorage.setItem('statusFirstSaleChallenge', 'DoubleClicked')
    }
  }

  if (isVisible && !isLoading) {
    return (
      <AlertCard
        className="_mb-6"
        title={t('first_sale_challenge.title')}
        subtitle={t('first_sale_challenge.subtitle')}
        iconName="lightbulb-on"
        link={dataFirstSales?.pageLink}
        onClick={onClick}
        onClose={onClose}
      />
    )
  }

  return null
}

export default FirstSaleChallenge
