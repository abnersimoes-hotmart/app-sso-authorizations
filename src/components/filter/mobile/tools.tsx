import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Form } from 'components/basic'

import {
  setIsCheckedBonusDeliveryOption,
  setIsCheckedDivulgationMaterialOption,
  setIsCheckedAlternativeHotlinksOption,
  setIsCheckedAlternativeDinamicHotlinksOption,
  setIsCheckedHotleadsOption
} from 'ducks/filters'
import { RootState } from 'ducks/index'

const ToolsMobile = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const {
    isCheckedBonusDeliveryOption,
    isCheckedDivulgationMaterialOption,
    isCheckedAlternativeHotlinksOption,
    isCheckedAlternativeDinamicHotlinksOption,
    isCheckedHotleadsOption
  } = useSelector(({ filters }: RootState) => filters)

  const handleBonusDeliveryCheckbox = () => {
    dispatch(setIsCheckedBonusDeliveryOption(!isCheckedBonusDeliveryOption))
  }

  const handleAlternativeHotlinksCheckbox = () => {
    dispatch(setIsCheckedAlternativeHotlinksOption(!isCheckedAlternativeHotlinksOption))
  }

  const handleAlternativeDinamicHotlinksCheckbox = () => {
    dispatch(setIsCheckedAlternativeDinamicHotlinksOption(!isCheckedAlternativeDinamicHotlinksOption))
  }

  const handleDivulgationMaterialCheckbox = () => {
    dispatch(setIsCheckedDivulgationMaterialOption(!isCheckedDivulgationMaterialOption))
  }

  const handleHotleadsCheckbox = () => {
    dispatch(setIsCheckedHotleadsOption(!isCheckedHotleadsOption))
  }

  return (
    <div className="hot-row _my-3">
      <div className="hot-col-lg-3 hot-col-sm-6">
        <Form.InputCheckbox
          onChange={handleBonusDeliveryCheckbox}
          id="bonusDeliveryOption"
          checked={isCheckedBonusDeliveryOption}
          className="_mt-4 _text-gray-700"
          label={t('filters.labels.bonus_delivery')}
        />
      </div>
      <div className="hot-col-lg-3 hot-col-sm-6">
        <Form.InputCheckbox
          onChange={handleAlternativeHotlinksCheckbox}
          id="alternativeHotlinksOption"
          checked={isCheckedAlternativeHotlinksOption}
          className="_mt-4 _text-gray-700"
          label={t('filters.labels.alternative_hotlinks')}
        />
      </div>
      <div className="hot-col-lg-3 hot-col-sm-6">
        <Form.InputCheckbox
          onChange={handleAlternativeDinamicHotlinksCheckbox}
          id="alternativeDinamicHotlinksOption"
          checked={isCheckedAlternativeDinamicHotlinksOption}
          className="_mt-4 _text-gray-700"
          label={t('filters.labels.alternative_dinamic_hotlinks')}
        />
      </div>
      <div className="hot-col-lg-3 hot-col-sm-6">
        <Form.InputCheckbox
          onChange={handleDivulgationMaterialCheckbox}
          id="divulgationMaterialOption"
          checked={isCheckedDivulgationMaterialOption}
          className="_mt-4 _text-gray-700"
          label={t('filters.labels.divulgation_material')}
        />
      </div>
      <div className="hot-col-lg-3 hot-col-sm-6">
        <Form.InputCheckbox
          onChange={handleHotleadsCheckbox}
          id="hotleadsOption"
          checked={isCheckedHotleadsOption}
          className="_mt-4 _text-gray-700"
          label={t('general.hotleads')}
        />
      </div>
    </div>
  )
}

export default ToolsMobile
