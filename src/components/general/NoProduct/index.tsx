import React from 'react'
import { useTranslation } from 'react-i18next'

const NoProduct = () => {
  const { t } = useTranslation()

  return (
    <div className="_m-3">{t('general.no_product')}</div>
  )
}

export default NoProduct
