import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconName } from '@fortawesome/fontawesome-svg-core'

import { Button, Card, Icon } from 'components/basic'

import './style.scss'

interface IPropTypes {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  onClose?: () => void
  title: string
  subtitle: string
  link?: string
  iconName?: IconName
  className?: string
}

const AlertCard = ({ onClick = () => null, onClose, title, subtitle, link, iconName, className = '' }: IPropTypes) => {
  const { t } = useTranslation()

  return (
    <Card
      className={`alert-card _p-4 _pr-lg-5 _d-flex _flex-lg-row _align-items-lg-center _justify-content-lg-between _position-relative _border-gray-200 ${className}`}
    >
      <div className="alert-card__bar _position-absolute _h-full"></div>
      <div className="_d-flex _flex-row _align-items-lg-center">
        {iconName && (
          <div className="alert-card__icon _d-flex _align-items-center _justify-content-center _bg-blue-lightest">
            <Icon type="light" iconName={iconName} className="_text-blue" />
          </div>
        )}
        <div className="_pl-4 _pr-6">
          <h3 className="_text-2 _mb-1 _font-weight">{title}</h3>
          <p className="_text-1 _m-0">{subtitle}</p>
        </div>
      </div>

      {link && (
        <div className="_d-flex _justify-content-end _mt-4 _mt-lg-0 _mr-lg-8">
          <a
            href={link}
            className="alert-card__link _d-flex _align-items-center _text-primary _text-1"
            rel="noopener noreferrer"
            target="_blank"
            onClick={onClick}
          >
            {t('general.access_content')}
            <Icon type="light" iconName="arrow-right" className="_ml-2" width={12} />
          </a>
        </div>
      )}

      {onClose && (
        <Button
          onClick={onClose}
          className="alert-card__close _d-flex _px-3 _position-absolute _border-0 _align-items-center"
          variation="terciary"
        >
          <Icon type="regular" iconName="times" className="_text-gray-400" />
        </Button>
      )}
    </Card>
  )
}

export default AlertCard
