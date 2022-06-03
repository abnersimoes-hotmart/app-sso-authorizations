import React from 'react'

import { useTranslation } from 'react-i18next'

import { Icon } from 'components/basic'

const FavoriteDataError = () => {
  const { t } = useTranslation()

  return (
    <div className="_d-flex _flex-column _align-items-center _justify-content-center _p-4">
      <div className="_d-flex _align-items-center _justify-content-center _p-4 _mb-4 _rounded-circle _border">
        <Icon
          className="_text-gray-300"
          type="solid"
          iconName="heart-broken"
          width={36}
          height={36}
        />
      </div>
      <h4 className="_mb-2 _text-3 _text-center _text-gray-500 _font-weight-light _px-4">
        {t('favorites.error_display_your_products_favorites')}
      </h4>
      <p className="_mb-0 _px-5 _text-1 _text-center _text-gray-500">
        {t('favorites.have_problem_try_again_later')}
      </p>
    </div>
  )
}

export default FavoriteDataError
