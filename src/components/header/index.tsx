import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Icon } from 'components/basic'
import { sendInteractionEvent } from 'utils/gaEvent'

interface IPropTypes {
  pageTitle: string,
  pageDescription?: string,
  className?: string,
  handleIsOpenMarketHelp?: (value: boolean) => void,
  showButtonFAQ?: boolean
}


const Header = ({
  pageTitle,
  pageDescription,
  className,
  handleIsOpenMarketHelp = () => null,
  showButtonFAQ
}: IPropTypes) => {
  const { t } = useTranslation()

  const handleClickOpenMarketHelp = () => {
    handleIsOpenMarketHelp(true),

    sendInteractionEvent({
      eventAction: 'Click:FAQ:Open',
      eventLabel: 'Open FAQ'
    })
  }

  const renderButtonFAQ = () => {
    if (showButtonFAQ) {
      return (
        <div className="_d-flex _align-items-center _mb-2">
          <Button
            variation="secondary"
            size="sm"
            onClick={handleClickOpenMarketHelp}
            className="_d-flex _align-items-center"
          >
            {t('help.title')}
            <Icon className="_text-blue _ml-2" type="regular" iconName="chevron-circle-right" fontSize={2} />
          </Button>
        </div>
      )
    }

    return null
  }

  const renderPageDescription = () => {
    if (pageDescription) {
      return (
        <p className="_mb-0 _text-2 _text-gray-800">
          {t(pageDescription)}
        </p>
      )
    }

    return null
  }

  return (
    <header className={`header _d-flex _flex-column _flex-md-row _justify-content-between ${className}`}>
      <div className="_d-flex _flex-column _mb-4">
        <h1 className="_m-0 _mb-2 _mb-md-3 _text-4 _text-md-7">{t(pageTitle)}</h1>
        {
          renderPageDescription()
        }
      </div>
      {
        renderButtonFAQ()
      }
    </header>
  )
}

export default Header
